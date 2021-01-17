import React from 'react';
import ReactPlayer from 'react-player';

import { Grid, IconButton, makeStyles, Menu, MenuItem, Paper, Select, Slider, Tooltip, Typography } from "@material-ui/core";

import {
    Forward10Outlined,
    PauseCircleOutlineOutlined,
    PlayCircleOutlineOutlined,
    PlaylistPlayOutlined,
    Replay10Outlined,
    SaveAltOutlined,
    ShareOutlined,
    SkipNextOutlined,
    SkipPreviousOutlined,
    VolumeDownOutlined,
    VolumeMuteOutlined,
    VolumeOffOutlined,
    VolumeUpOutlined,
} from '@material-ui/icons';
import { CallRecording } from '../CallRecording';

interface CallRecordingPlayerProps {
    callRecordings: CallRecording[];
}

export function CallRecordingPlayer(props: CallRecordingPlayerProps) {
    // Styles
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();


    // State
    const [audioPlayer, setAudioPlayer] = React.useState<ReactPlayer | null>();
    const [currentRecordingIndex, setCurrentRecordingIndex] = React.useState(-1);
    const [duration, setDuration] = React.useState(0);
    const [muted, setMuted] = React.useState(false);
    const [playbackRate, setPlaybackRate] = React.useState(1.0);
    const [played, setPlayed] = React.useState(0);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [playlist] = React.useState(props.callRecordings.slice(0));  // Clone callRecordings
    const [playlistMenuAnchorEl, setPlaylistMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [volume, setVolume] = React.useState(0.8);


    // Functions
    const formatSeconds = (seconds: number) => {
        // Format as MM:SS
        seconds = Math.round(seconds);
        return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
    };

    const getCurrentRecording = () => playlist[currentRecordingIndex];

    const playPreviousRecording = () => {
        setCurrentRecordingIndex(prevIndex => prevIndex - 1);
    }

    const playNextRecording = () => {
        setCurrentRecordingIndex(prevIndex => prevIndex + 1);
    }


    // Init
    React.useEffect(playNextRecording, [playlist]);


    // Event Handlers
    const onPlaybackRateSelect_change = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPlaybackRate(event.target.value as number);
    };

    const onSkipPreviousButton_click = () => {
        if (playedSeconds < 2 && currentRecordingIndex > 0) {
            playPreviousRecording();
        } else {
            audioPlayer?.seekTo(0, "seconds");
        }
    };

    const onReplay10Button_click = () => {
        audioPlayer?.seekTo(Math.max(playedSeconds - 10, 0), "seconds");
    };

    const onPlayPauseButton_click = () => {
        setPlaying(!playing);
    };

    const onForward10Button_click = () => {
        audioPlayer?.seekTo(Math.min(playedSeconds + 10, duration), "seconds");
    };

    const onSkipNextButton_click = () => {
        playNextRecording();
    };

    const onPlaylistButton_click = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPlaylistMenuAnchorEl(event.currentTarget);
    };

    const onVolumeButton_click = () => {
        setMuted(!muted);
    };

    const onShareButton_click = () => {

    };

    const onDownloadButton_click = () => {

    };

    const onAudioPlayer_duration = (seconds: number) => {
        setDuration(seconds);
    };

    const onAudioPlayer_ended = () => {
        setPlaying(false);
    };

    const onAudioPlayer_pause = () => {
        setPlaying(false);
    };

    const onAudioPlayer_play = () => {
        setPlaying(true);
    };

    const onAudioPlayer_progress = (state: any) => {
        setPlayed(state.played);
        setPlayedSeconds(state.playedSeconds);
    };

    const onPlaylistMenu_close = () => {
        setPlaylistMenuAnchorEl(null);
    };

    const onPlaylistMenuItem_click = (callRecordingIndex: number) => {
        setCurrentRecordingIndex(callRecordingIndex);
        setPlaylistMenuAnchorEl(null);
    };

    const onProgressSlider_change = (event: any, value: number | number[]) => {
        audioPlayer?.seekTo(value as number, "seconds");
    };

    const onVolumeSlider_change = (event: any, value: number | number[]) => {
        setVolume(value as number);
    };

    // Markup
    return <div className={classes.root}>
        <Grid
            container
            alignItems="center"
            justify="space-between"
            spacing={2}
        >
            <Grid item>
                <Paper>Stats</Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <Typography>{getCurrentRecording()?.title}</Typography>
                    <Grid container alignItems="center" justify="space-between">
                        <Typography>
                            {formatSeconds(playedSeconds)}
                        </Typography>
                        <Slider
                            value={playedSeconds}
                            className="smooth-slider"
                            style={{ width: 275 }}
                            min={0}
                            max={duration}
                            onChange={onProgressSlider_change}
                        />
                        <Typography>
                            {formatSeconds(duration)}
                        </Typography>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Tooltip title="Playback Speed">
                            <Select
                                value={playbackRate}
                                onChange={onPlaybackRateSelect_change}
                            >
                                <MenuItem value={1}>1x</MenuItem>
                                <MenuItem value={1.5}>1.5x</MenuItem>
                                <MenuItem value={2}>2x</MenuItem>
                            </Select>
                        </Tooltip>
                        <Tooltip title="Previous">
                            <IconButton onClick={onSkipPreviousButton_click}>
                                <SkipPreviousOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Rewind 10 seconds">
                            <IconButton onClick={onReplay10Button_click}>
                                <Replay10Outlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={playing ? "Pause" : "Play"}>
                            <IconButton onClick={onPlayPauseButton_click}>
                                {
                                    playing
                                        ? <PauseCircleOutlineOutlined />
                                        : <PlayCircleOutlineOutlined />
                                }
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Skip 10 seconds">
                            <IconButton onClick={onForward10Button_click}>
                                <Forward10Outlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Next">
                            <IconButton onClick={onSkipNextButton_click} disabled={currentRecordingIndex === playlist.length - 1}>
                                <SkipNextOutlined />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <Grid container alignItems="center" justify="space-between" spacing={2}>
                        <Tooltip title="Up Next">
                            <IconButton onClick={onPlaylistButton_click} disabled={currentRecordingIndex === playlist.length - 1}>
                                <PlaylistPlayOutlined />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={playlistMenuAnchorEl}
                            keepMounted
                            open={Boolean(playlistMenuAnchorEl)}
                            onClose={onPlaylistMenu_close}
                        >
                            {playlist.slice(currentRecordingIndex + 1).map((callRecording, index) =>
                                <MenuItem
                                    key={callRecording.cdrId}
                                    onClick={() => { onPlaylistMenuItem_click(currentRecordingIndex + 1 + index); }}
                                >
                                    {callRecording.title} - {formatSeconds(callRecording.durationSeconds)}
                                </MenuItem>
                            )}
                        </Menu>
                        <Tooltip title="Mute">
                            <IconButton onClick={onVolumeButton_click}>
                                {muted
                                    ? <VolumeOffOutlined />
                                    : volume === 0
                                        ? <VolumeMuteOutlined />
                                        : volume < 0.5
                                            ? <VolumeDownOutlined />
                                            : <VolumeUpOutlined />
                                }
                            </IconButton>
                        </Tooltip>
                        <Slider
                            step={0.05}
                            style={{ width: 80 }} min={0} max={1}
                            value={volume}
                            onChange={onVolumeSlider_change}
                        />
                        <Tooltip title="Share">
                            <IconButton onClick={onShareButton_click}>
                                <ShareOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                            <IconButton onClick={onDownloadButton_click}>
                                <SaveAltOutlined />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <ReactPlayer
            ref={setAudioPlayer}

            muted={muted}
            url={getCurrentRecording()?.url}
            playbackRate={playbackRate}
            played={played}
            playing={playing}
            volume={volume}

            progressInterval={1000 * 0.1 /* Set to 0.05 less than the smooth-slider transition length */}

            onDuration={onAudioPlayer_duration}
            onEnded={onAudioPlayer_ended}
            onPause={onAudioPlayer_pause}
            onPlay={onAudioPlayer_play}
            onProgress={onAudioPlayer_progress}

            config={{
                file: {
                    forceAudio: true,
                },
            }}
        />
    </div>
}