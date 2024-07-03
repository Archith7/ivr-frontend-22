import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Customerservice = () => {
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [callStarted, setCallStarted] = useState(false);

  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);

  const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  useEffect(() => {
    socket.on('offer', async (offer) => {
      if (isAdmin) return;

      const pc = new RTCPeerConnection(configuration);
      setPeerConnection(pc);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', event.candidate);
        }
      };

      pc.ontrack = (event) => {
        remoteAudioRef.current.srcObject = event.streams[0];
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', answer);
    });

    socket.on('answer', async (answer) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on('candidate', async (candidate) => {
      if (peerConnection) {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.error('Error adding received ice candidate', e);
        }
      }
    });

    socket.on('endCall', () => {
      endCall();
    });

    return () => {
      socket.disconnect();
    };
  }, [localStream, peerConnection, isAdmin]);

  const startCall = async () => {
    try {
      let stream = localStream;
      if (!localStream) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setLocalStream(stream);
        localAudioRef.current.srcObject = stream;
        localAudioRef.current.muted = true;
      }

      socket.emit('checkAdmin', (response) => {
        if (!response.success) {
          alert('Admin is not available at the moment');
          return;
        }

        const pc = new RTCPeerConnection(configuration);
        setPeerConnection(pc);

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('candidate', event.candidate);
          }
        };

        pc.ontrack = (event) => {
          remoteAudioRef.current.srcObject = event.streams[0];
        };

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        pc.createOffer().then((offer) => {
          pc.setLocalDescription(offer);
          socket.emit('offer', offer);
          setCallStarted(true);
        });
      });
    } catch (error) {
      console.error('Error starting call.', error);
    }
  };

  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
      localAudioRef.current.srcObject = null;
      remoteAudioRef.current.srcObject = null;
      socket.emit('endCall');
      setCallStarted(false);
    }
  };

  return (
    <div>
      <h1>Call A Virtual Agent</h1>
      <div className="call-container">
        {!isAdmin && <button onClick={startCall} className="btn">Start Call</button>}
        <button onClick={endCall} className="btn">End Call</button>
      </div>
      <div id="audioContainer">
        <audio ref={localAudioRef} autoPlay></audio>
        <audio ref={remoteAudioRef} autoPlay></audio>
      </div>
    </div>
  );
};

export default Customerservice;
