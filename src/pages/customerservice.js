// import React, { useState, useRef, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

const Customerservice = () => {
  

  return (
    <div>
      <h1>Call A Virtual Agent</h1>
      <div className="call-container">
        { <button className="btn">Start Call</button>}
        <button  className="btn">End Call</button>
      </div>
      {/* <div id="audioContainer"> */}
        {/* <audio ref={localAudioRef} autoPlay></audio>
        <audio ref={remoteAudioRef} autoPlay></audio> */}
      {/* </div> */}
    </div>
  );
};

export default Customerservice;
