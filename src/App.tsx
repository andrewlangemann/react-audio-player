import React from 'react';
import './App.css';
import { CallRecordingPlayer } from "./components/CallRecordingPlayer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CallRecordingPlayer/>
      </header>
    </div>
  );
}

export default App;
