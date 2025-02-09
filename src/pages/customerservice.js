import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import '../stylecss/webrtc.css';

const socket = io('http://localhost:5000'); // Change to your backend URL

const authorizedUsers = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  // Add more users as needed
];

const Webrtc = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(false);

  const [localStream, setLocalStream] = useState(null);
  const remoteAudioRef = useRef();
  const peerConnectionRef = useRef();
  const iceCandidatesRef = useRef([]);
  const targetUserRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);
        setupSocket();
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMedia();

    return () => {
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('candidate', handleCandidate);
      socket.off('onlineUsers', handleOnlineUsers);
    };
  }, []);

  useEffect(() => {
    socket.on('onlineUsers', handleOnlineUsers);

    return () => {
      socket.off('onlineUsers', handleOnlineUsers);
    };
  }, []);

  const setupSocket = () => {
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('candidate', handleCandidate);
  };

  const handleOnlineUsers = (users) => {
    setOnlineUsers(users.filter(user => user !== username));
  };

  const handleLogin = async () => {
    const isAuthenticated = authorizedUsers.some(user => user.username === username && user.password === password);
    if (isAuthenticated) {
      try {
        if (!localStream) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setLocalStream(stream);
        }
        socket.emit('login', username);
        setIsOnline(true);
        setAuthenticated(true);
        setOnlineUsers(prevUsers => [...prevUsers, username]);
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    } else {
      console.error('Invalid credentials.');
    }
  };

  const startCall = async () => {
    if (!isOnline) {
      console.error('You must be logged in and marked online to initiate a call.');
      return;
    }

    if (onlineUsers.length === 0) {
      alert('No other users available to take the call.');
      return;
    }

    if (!localStream) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices.', error);
        return;
      }
    }

    const targetUser = onlineUsers[0];
    targetUserRef.current = targetUser;
    const peerConnection = createPeerConnection();
    peerConnectionRef.current = peerConnection;

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', { offer, targetUser });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const handleOffer = async ({ offer, sender }) => {
    if (!localStream) {
      console.error('Local stream not available.');
      return;
    }

    const peerConnection = createPeerConnection();
    if (!peerConnection) {
      console.error('Failed to create peer connection.');
      return;
    }
    peerConnectionRef.current = peerConnection;

    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', { answer, sender });

      iceCandidatesRef.current.forEach(async (candidate) => {
        try {
          await peerConnection.addIceCandidate(candidate);
        } catch (error) {
          console.error('Error adding queued ICE candidate:', error);
        }
      });
      iceCandidatesRef.current = [];
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async ({ answer }) => {
    const peerConnection = peerConnectionRef.current;
    if (peerConnection) {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    }
  };

  const handleCandidate = async ({ candidate }) => {
    const peerConnection = peerConnectionRef.current;
    if (peerConnection && peerConnection.remoteDescription) {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    } else {
      iceCandidatesRef.current.push(new RTCIceCandidate(candidate));
      console.warn('Queued ICE candidate as remote description is not set yet.');
    }
  };

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('candidate', { candidate: event.candidate, targetUser: targetUserRef.current });
      }
    };

    peerConnection.ontrack = (event) => {
      remoteAudioRef.current.srcObject = event.streams[0];
    };

    if (localStream) {
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    } else {
      console.error('Local stream not available when creating peer connection.');
    }

    return peerConnection;
  };

  return (
    <div className="container">
      {!authenticated ? (
        <div>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Online Users:</h2>
          <ul>
            {onlineUsers.map(user => (
              <li key={user}>{user}</li>
            ))}
          </ul>
          {isOnline && (
            <button onClick={startCall}>Start Call</button>
          )}
          <audio ref={remoteAudioRef} autoPlay />
        </div>
      )}
    </div>
  );
};

export default Webrtc;
