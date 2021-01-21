import { Button } from '@material-ui/core';
import React from 'react';
import './App.css';
import { AudioPlayer, AudioTrack } from "./components/AudioPlayer";

function App() {

  const [tracks, setTracks] = React.useState<AudioTrack[]>([]);

  const audioTracks = [
    {
      cdrId: 1,
      durationSeconds: 57,
      title: "Call Recording - 123-123-1234",
      audioUrl: "https://bigsoundbank.com/UPLOAD/ogg/0267.ogg",
      downloadUrl: "https://bigsoundbank.com/UPLOAD/wav/0267.wav",
      displayDetails: [{ label: "Name", value: "Remi" }]
    },
    {
      cdrId: 2,
      durationSeconds: 17,
      title: "Call Recording - 234-123-1234",
      audioUrl: "https://bigsoundbank.com/UPLOAD/ogg/0113.ogg",
      downloadUrl: "https://bigsoundbank.com/UPLOAD/wav/0113.wav",
      displayDetails: [{ label: "Name", value: "Comet" }]
    },
    {
      cdrId: 3,
      durationSeconds: 27,
      title: "Call Recording - 879-123-1234",
      audioUrl: "https://bigsoundbank.com/UPLOAD/ogg/0214.ogg",
      downloadUrl: "https://bigsoundbank.com/UPLOAD/wav/0214.wav",
      displayDetails: [{ label: "Name", value: "Betty" }]
    },
    {
      cdrId: 4,
      durationSeconds: 1,
      title: "Call Recording - 555-123-1234",
      audioUrl: "https://bigsoundbank.com/UPLOAD/ogg/0268.ogg",
      downloadUrl: "https://bigsoundbank.com/UPLOAD/wav/0268.wav",
      displayDetails: [{ label: "Name", value: "Lola" }]
    },
  ];

  return (
    <div className="App">
      <p>Hello there</p>
      <div>
        {audioTracks.map((track: AudioTrack) =>
          <Button variant="contained" key={track.cdrId} onClick={() => { setTracks([track]) }}>
            Play Track {track.cdrId}
          </Button>
        )}
      </div>
      <div className="audio-player-bar app-bar">
        <AudioPlayer audioTracks={tracks} />
      </div>
    </div >
  );
}

export default App;
