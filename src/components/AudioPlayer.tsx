import * as React from "react";
import ReactPlayer from "react-player";
import { formatSeconds } from "../utils";

import { Grid, IconButton, LinearProgress, makeStyles, Menu, MenuItem, Select, Slider, Tooltip, Typography } from "@material-ui/core";

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
} from "@material-ui/icons";

export interface AudioTrack {
    cdrId: number;
    title: string;
    audioUrl: string;
    downloadUrl: string;
    durationSeconds: number;
    displayDetails: Array<{ label: string, value: string | undefined }>;
}

interface AudioPlayerProps {
    audioTracks: AudioTrack[];
}

export function AudioPlayer(props: AudioPlayerProps) {
    // Styles
    const useStyles = makeStyles(() => ({
        contentRoot: {
            color: "white",
            height: 110,
            padding: "20px 15px 15px 15px",

            "& .MuiInputBase-root, & .MuiSelect-icon": {
                color: "white",
            },
        },

        iconButton: {
            color: "#36d3ff",
            "&.MuiIconButton-root.Mui-disabled": {
                color: "#36d3ff",
                opacity: "0.5",
            },
        },

        slider: {
            "&.MuiSlider-root": {
                color: "rgba(0,0,0,0.6)",
            },
            "& .MuiSlider-track": {
                "background-color": "#36d3ff",
            },
            "& .MuiSlider-thumb": {
                "background-color": "#36d3ff",
            },
        },

        progressSlider: {
            marginTop: 4,

            // Make the slider thumb move smoothly.
            "& .MuiSlider-thumb:not(.MuiSlider-active)": {
                transition: "left 0.15s linear 0s",
            },
            "& .MuiSlider-track": {
                transition: "width 0.15s linear 0s",
            },
        },

        detailLabel: {
            fontSize: "0.8em",
            textAlign: "right",
        },

        detailValue: {
            fontSize: "0.8em",
            color: "#36d3ff",
        }
    }));
    const classes = useStyles();


    // State
    const [player, setPlayer] = React.useState<ReactPlayer | null>();
    const [currentTrack, setCurrentTrack] = React.useState<AudioTrack | null>();
    const [currentTrackIndex, setCurrentTrackIndex] = React.useState(-1);
    const [loading, setLoading] = React.useState(false);
    const [muted, setMuted] = React.useState(false);
    const [playbackRate, setPlaybackRate] = React.useState(1.0);
    const [played, setPlayed] = React.useState(0);
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [playlistMenuAnchorEl, setPlaylistMenuAnchorEl] = React.useState<HTMLElement | null>();
    const [volume, setVolume] = React.useState(0.8);


    // Functions
    const onLastTrack = () => currentTrackIndex === props.audioTracks.length - 1;

    const playPreviousTrack = () => setCurrentTrackIndex(prevIndex => prevIndex - 1);

    const playNextTrack = () => setCurrentTrackIndex(prevIndex => prevIndex + 1);


    // Hooks
    React.useEffect(() => {
        setLoading(true);
        setCurrentTrackIndex(0);
        setPlaying(true);
    }, [props.audioTracks]);

    React.useEffect(() => {
        setCurrentTrack(props.audioTracks[currentTrackIndex]);
    }, [props.audioTracks, currentTrackIndex]);


    // Event Handlers
    const onPlaybackRateSelect_change = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPlaybackRate(event.target.value as number);
    };

    const onSkipPreviousButton_click = () => {
        if (playedSeconds < 2 && currentTrackIndex > 0) {
            playPreviousTrack();
        } else {
            player?.seekTo(0, "seconds");
        }
    };

    const onReplay10Button_click = () => {
        player?.seekTo(Math.max(playedSeconds - 10, 0), "seconds");
    };

    const onPlayPauseButton_click = () => {
        setPlaying(!playing);
    };

    const onForward10Button_click = () => {
        if (currentTrack)
            player?.seekTo(Math.min(playedSeconds + 10, currentTrack.durationSeconds), "seconds");
    };

    const onSkipNextButton_click = () => {
        playNextTrack();
    };

    const onPlaylistButton_click = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPlaylistMenuAnchorEl(event.currentTarget);
    };

    const onVolumeButton_click = () => {
        setMuted(!muted);
    };

    const onShareButton_click = () => {
        alert('Share it!');
    };

    const onDownloadButton_click = () => {
        window.open(currentTrack?.downloadUrl, '_blank');
    };

    const onPlayer_ended = () => {
        setPlaying(false);
    };

    const onPlayer_pause = () => {
        setPlaying(false);
    };

    const onPlayer_play = () => {
        setPlaying(true);
    };

    const onPlayer_progress = (state: any) => {
        setPlayed(state.played);
        setPlayedSeconds(state.playedSeconds);
    };

    const onPlayer_ready = () => {
        setLoading(false);
    };

    const onPlaylistMenu_close = () => {
        setPlaylistMenuAnchorEl(null);
    };

    const onPlaylistMenuItem_click = (trackIndex: number) => {
        setCurrentTrackIndex(trackIndex);
        setPlaylistMenuAnchorEl(null);
    };

    const onProgressSlider_change = (event: any, value: number | number[]) => {
        player?.seekTo(value as number, "seconds");
    };

    const onVolumeSlider_change = (event: any, value: number | number[]) => {
        setVolume(value as number);
    };

    // Markup
    return <div>
        <LinearProgress style={{ visibility: loading ? "visible" : "hidden" }} />
        <div className={classes.contentRoot}>
            <Grid
                container
                alignItems="center"
                justify="space-between"
                spacing={5}
            >
                <Grid item xs={3} container direction="column">
                    {currentTrack?.displayDetails.map((detail: { label: string; value: string | undefined; }) =>
                        <Grid item container direction="row" spacing={1} key={detail.label}>
                            <Grid item style={{ width: 85 }} className={classes.detailLabel}>{detail.label}:</Grid>
                            <Grid item xs className={classes.detailValue}>{detail.value}</Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs container direction="column" alignItems="center" justify="space-between">
                    <Grid item xs>
                        <Typography align="center">{currentTrack?.title} - {formatSeconds(currentTrack?.durationSeconds || 0)}</Typography>
                    </Grid>
                    <Grid item xs container alignItems="center" justify="space-between" spacing={2}>
                        <Grid item>
                            {formatSeconds(playedSeconds)}
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={playedSeconds}
                                className={`${classes.progressSlider} ${classes.slider}`}
                                min={0}
                                max={currentTrack?.durationSeconds || 0}
                                onChange={onProgressSlider_change}
                            />
                        </Grid>
                        <Grid item>
                            {formatSeconds(currentTrack?.durationSeconds || 0)}
                        </Grid>
                    </Grid>
                    <Grid item xs container alignItems="center" justify="space-between" spacing={4}>
                        <Grid item xs={2}>
                            <Select value={playbackRate} onChange={onPlaybackRateSelect_change}>
                                <MenuItem value={1}>1.0x</MenuItem>
                                <MenuItem value={1.5}>1.5x</MenuItem>
                                <MenuItem value={2}>2.0x</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs container alignItems="center" justify="center" spacing={2}>
                            <Grid item>
                                <Tooltip title="Previous">
                                    <IconButton onClick={onSkipPreviousButton_click} className={classes.iconButton}>
                                        <SkipPreviousOutlined />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Rewind 10 seconds">
                                    <IconButton onClick={onReplay10Button_click} className={classes.iconButton}>
                                        <Replay10Outlined />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={playing ? "Pause" : "Play"}>
                                    <IconButton onClick={onPlayPauseButton_click} className={classes.iconButton}>
                                        {
                                            playing
                                                ? <PauseCircleOutlineOutlined />
                                                : <PlayCircleOutlineOutlined />
                                        }
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Skip 10 seconds">
                                    <IconButton onClick={onForward10Button_click} className={classes.iconButton}>
                                        <Forward10Outlined />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Next">
                                    {/* Use span so that the tooltip will show when the button is disabled.*/}
                                    <span>
                                        <IconButton onClick={onSkipNextButton_click} disabled={onLastTrack()} className={classes.iconButton}>
                                            <SkipNextOutlined />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} />
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container alignItems="center" justify="flex-end" spacing={2}>
                        <Tooltip title="Up Next">
                            {/* Use span so that the tooltip will show when the button is disabled.*/}
                            <span>
                                <IconButton onClick={onPlaylistButton_click} disabled={onLastTrack()} className={classes.iconButton}>
                                    <PlaylistPlayOutlined />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Menu
                            anchorEl={playlistMenuAnchorEl}
                            keepMounted
                            open={Boolean(playlistMenuAnchorEl)}
                            onClose={onPlaylistMenu_close}
                        >
                            {props.audioTracks.slice(currentTrackIndex + 1).map((track, index) =>
                                <MenuItem
                                    key={track.cdrId}
                                    onClick={() => { onPlaylistMenuItem_click(currentTrackIndex + 1 + index); }}
                                >
                                    {track.title} - {formatSeconds(track.durationSeconds)}
                                </MenuItem>
                            )}
                        </Menu>
                        <Tooltip title="Mute">
                            <IconButton onClick={onVolumeButton_click} className={classes.iconButton}>
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
                            className={classes.slider}
                            style={{ width: 80 }}
                            min={0}
                            max={1}
                            value={volume}
                            onChange={onVolumeSlider_change}
                        />
                        <Tooltip title="Share">
                            <IconButton onClick={onShareButton_click} className={classes.iconButton}>
                                <ShareOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                            <IconButton onClick={onDownloadButton_click} className={classes.iconButton}>
                                <SaveAltOutlined />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <ReactPlayer
                ref={setPlayer}

                muted={muted}
                url={currentTrack?.audioUrl}
                playbackRate={playbackRate}
                played={played}
                playing={playing}
                volume={volume}

                progressInterval={1000 * 0.1 /* Set to 0.05 less than the smooth-slider transition length */}

                onEnded={onPlayer_ended}
                onPause={onPlayer_pause}
                onPlay={onPlayer_play}
                onProgress={onPlayer_progress}
                onReady={onPlayer_ready}

                config={{
                    file: {
                        forceAudio: true,
                    },
                }}
            />
        </div>
    </div>
}