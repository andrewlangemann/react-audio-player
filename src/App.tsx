import React from 'react';
import './App.css';
import { CallRecordingPlayer } from "./components/CallRecordingPlayer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CallRecordingPlayer callRecordings={[
          {
            cdrId: 1,
            durationSeconds: 100,
            title: "Call Recording - 123-123-1234",
            url: "https://bigsoundbank.com/UPLOAD/ogg/0267.ogg",
          },
          {
            cdrId: 2,
            durationSeconds: 250,
            title: "Call Recording - 234-123-1234",
            url: "https://bigsoundbank.com/UPLOAD/ogg/0113.ogg",
          },
          {
            cdrId: 3,
            durationSeconds: 68,
            title: "Call Recording - 879-123-1234",
            url: "https://bigsoundbank.com/UPLOAD/ogg/0214.ogg",
          },
          {
            cdrId: 4,
            durationSeconds: 32,
            title: "Call Recording - 555-123-1234",
            url: "https://bigsoundbank.com/UPLOAD/ogg/0268.ogg",
          },
        ]} />
      </header>
    </div>
  );
}

export default App;
