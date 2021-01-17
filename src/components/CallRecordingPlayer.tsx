import React from 'react';
import ReactPlayer from 'react-player';

import { Button, Container, Grid, IconButton, makeStyles, MenuItem, Paper, Select, Slider, Typography } from "@material-ui/core";

import {
    FastForwardOutlined,
    FastRewindOutlined,
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

// Render a YouTube video player

export function CallRecordingPlayer() {
    const [url, setUrl] = React.useState<string>("https://bigsoundbank.com/UPLOAD/ogg/0267.ogg");

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

    const [played, setPlayed] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [playbackRate, setPlaybackRate] = React.useState(1.0);
    const [volume, setVolume] = React.useState(0.8);

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
                            00:00
                        </Typography>
                        <Slider min={0} max={0.999999} value={played} />
                        <Typography>
                            00:50
                        </Typography>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Select
                            value={playbackRate}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => { setPlaybackRate(event.target.value as number); }}
                        >
                            <MenuItem value={1}>1x</MenuItem>
                            <MenuItem value={1.5}>1.5x</MenuItem>
                            <MenuItem value={2}>2x</MenuItem>
                        </Select>
                        <IconButton>
                            <SkipPreviousOutlined />
                        </IconButton>
                        <IconButton>
                            <Replay10Outlined />
                        </IconButton>
                        <IconButton>
                            <FastRewindOutlined />
                        </IconButton>
                        <IconButton onClick={() => { setPlaying(!playing); }}>
                            {
                                playing
                                    ? <PauseCircleOutlineOutlined />
                                    : <PlayCircleOutlineOutlined />
                            }
                        </IconButton>
                        <IconButton>
                            <FastForwardOutlined />
                        </IconButton>
                        <IconButton>
                            <Forward10Outlined />
                        </IconButton>
                        <IconButton>
                            <SkipNextOutlined />
                        </IconButton>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>More!</Paper>
            </Grid>
        </Grid>
        <ReactPlayer
            ref={(player) => {
                setAudioPlayer(player);
            }}

            url={url}
            playbackRate={playbackRate}
            played={played}
            playing={playing}
            volume={volume}

            onProgress={(state) => {
                setPlayed(state.played);
            }}

            config={{
                file: {
                    forceAudio: true,
                },
            }}
        />
    </div>

    // return <Paper>
    //     <Button onClick={onButtonClick}>Play Recording</Button>

    //     <Grid>

    //     </Grid>

    //     
    // </Paper>
}