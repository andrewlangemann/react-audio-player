import React from 'react';
import ReactPlayer from 'react-player';

import { Grid, IconButton, makeStyles, MenuItem, Paper, Select, Slider, Typography } from "@material-ui/core";

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

export function CallRecordingPlayer() {
    const [url] = React.useState<string>("https://bigsoundbank.com/UPLOAD/ogg/0267.ogg");

    // Styles
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();


    // State
    const [audioPlayer, setAudioPlayer] = React.useState<ReactPlayer | null>();
    const [duration, setDuration] = React.useState(0);
    const [muted, setMuted] = React.useState(false);
    const [played, setPlayed] = React.useState(0);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [playbackRate, setPlaybackRate] = React.useState(1.0);
    const [volume] = React.useState(0.8);


    // Helper Functions
    const formatSeconds = (seconds: number) => {
        // Format as MM:SS
        return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
    };


    // Event Handlers
    const onPlaybackRateSelect_change = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPlaybackRate(event.target.value as number);
    };

    const onSkipPreviousButton_click = () => {

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

    };

    const onPlaylistButton_click = () => {

    };

    const onVolumeButton_click = () => {
        setMuted(!muted);
    };

    const onShareButton_click = () => {

    };

    const onDownloadButton_click = () => {

    };

    const onAudioPlayer_duration = (seconds: number) => {
        setDuration(Math.round(seconds));
    };

    const onAudioPlayer_ended = () => {
        setPlaying(false);
    };

    const onAudioPlayer_progress = (state: any) => {
        setPlayed(state.played);
        setPlayedSeconds(Math.round(state.playedSeconds));
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
                    <Typography>Call Recording - 123-456-7890 - January 1st 12:00 PM</Typography>
                    <Grid container alignItems="center" justify="space-between">
                        <Typography>
                            {formatSeconds(playedSeconds)}
                        </Typography>
                        <Slider style={{ width: 275 }} min={0} max={0.999999} value={played} />
                        <Typography>
                            {formatSeconds(duration)}
                        </Typography>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Select
                            value={playbackRate}
                            onChange={onPlaybackRateSelect_change}
                        >
                            <MenuItem value={1}>1x</MenuItem>
                            <MenuItem value={1.5}>1.5x</MenuItem>
                            <MenuItem value={2}>2x</MenuItem>
                        </Select>
                        <IconButton>
                            <SkipPreviousOutlined onClick={onSkipPreviousButton_click} />
                        </IconButton>
                        <IconButton>
                            <Replay10Outlined onClick={onReplay10Button_click} />
                        </IconButton>
                        <IconButton onClick={onPlayPauseButton_click}>
                            {
                                playing
                                    ? <PauseCircleOutlineOutlined />
                                    : <PlayCircleOutlineOutlined />
                            }
                        </IconButton>
                        <IconButton>
                            <Forward10Outlined onClick={onForward10Button_click} />
                        </IconButton>
                        <IconButton>
                            <SkipNextOutlined onClick={onSkipNextButton_click} />
                        </IconButton>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <Grid container alignItems="center" justify="space-between" spacing={2}>
                        <IconButton onClick={onPlaylistButton_click}>
                            <PlaylistPlayOutlined />
                        </IconButton>
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
                        <Slider style={{ width: 80 }} min={0} max={0.999999} value={volume} />
                        <IconButton onClick={onShareButton_click}>
                            <ShareOutlined />
                        </IconButton>
                        <IconButton onClick={onDownloadButton_click}>
                            <SaveAltOutlined />
                        </IconButton>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <ReactPlayer
            ref={(player) => {
                setAudioPlayer(player);
            }}

            muted={muted}
            url={url}
            playbackRate={playbackRate}
            played={played}
            playing={playing}
            volume={volume}

            onDuration={onAudioPlayer_duration}
            onEnded={onAudioPlayer_ended}
            onProgress={onAudioPlayer_progress}

            config={{
                file: {
                    forceAudio: true,
                },
            }}
        />
    </div>
}