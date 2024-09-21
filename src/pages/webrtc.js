import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import '../stylecss/webrtc.css';  // Import the CSS file

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
  const iceCandidatesRef = useRef([]);  // Queue to store ICE candidates before setting remote description
  const targetUserRef = useRef(null); // Ref to store the current target user for calls

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
      // Cleanup socket listeners
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
    setOnlineUsers(users.filter(user => user !== username)); // Exclude self from online users
  };

  const handleLogin = () => {
    const isAuthenticated = authorizedUsers.some(user => user.username === username && user.password === password);
    if (isAuthenticated) {
      socket.emit('login', username);
      setIsOnline(true); // Mark user as online
      setAuthenticated(true);
      // Update local state immediately (optimistic update)
      setOnlineUsers(prevUsers => [...prevUsers, username]);
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

    const targetUser = onlineUsers[0]; // Select the first available user (arbitrary choice for demonstration)
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
    try {
      if (!localStream) {
        console.error('Local stream not available.');
        return;
      }
  
      const peerConnection = createPeerConnection();
      peerConnectionRef.current = peerConnection;
  
      // Rest of your offer handling code
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
      // Queue the candidate if the remote description is not yet set
      iceCandidatesRef.current.push(new RTCIceCandidate(candidate));
      console.warn('Queued ICE candidate as remote description is not set yet.');
    }
  };

  const createPeerConnection = () => {
    if (!localStream) {
      console.error('Local stream not available when creating peer connection.');
      return null; // or handle the error accordingly
    }
  
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
  
    // Rest of your peer connection setup
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
