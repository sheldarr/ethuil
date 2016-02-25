import React from 'react';
import { Button, Glyphicon, Panel, Table } from 'react-bootstrap';

import Background from './background.jsx';
import BackgroundsApi from './backgroundsApi.jsx';
import CarsApi from './carsApi.jsx';
import Logos from './logos.jsx';
import SongsApi from './songsApi.jsx';
import YouTube from 'react-youtube';

const Playlist = React.createClass({
    getInitialState () {
        return {
            background: '',
            backgrounds: [],
            car: '',
            cars: [],
            currentSong: '',
            playlistStyle: {
                bottom: '27%',
                left: '60%',
                maxHeight: '28%',
                opacity: '0.5',
                overflowX: 'hidden',
                overflowY: 'scroll',
                position: 'fixed',
                width: '22%'
            },
            songPaused: false,
            songs: []
        };
    },

    componentWillMount () {
        this.downloadBackgrounds();
        this.downloadCars();
        this.downloadSongs();
    },

    downloadBackgrounds () {
        BackgroundsApi.getAll()
            .then(response => {
                this.setState({
                    background: response[Math.floor(Math.random() * response.length)],
                    backgrounds: response
                });
            })
            .catch(error => {
                alert(error);
            });
    },

    downloadCars () {
        CarsApi.getAll()
            .then(response => {
                this.setState({
                    car: response[Math.floor(Math.random() * response.length)],
                    cars: response
                });
            })
            .catch(error => {
                alert(error);
            });
    },

    downloadSongs () {
        SongsApi.getAll()
            .then(response => {
                this.setState({
                    songs: response
                });
            })
            .catch(error => {
                alert(error);
            });
    },

    handleConfigurationSaving (selectedBackground, selectedCar) {
        localStorage.setItem('background', selectedBackground);
        localStorage.setItem('car', selectedCar);

        this.setState({
            background: selectedBackground,
            car: selectedCar
        });
    },

    previousBackground () {
        if (this.state.backgrounds.length === 1) {
            return;
        }

        if (this.state.backgrounds.indexOf(this.state.background) === 0) {
            this.setState({
                background: this.state.backgrounds[this.state.backgrounds.length - 1]
            });

            return;
        }

        this.setState({
            background: this.state.backgrounds[this.state.backgrounds.indexOf(this.state.background) - 1]
        });
    },

    nextBackground () {
        if (this.state.backgrounds.length === 1) {
            return;
        }

        if (this.state.backgrounds.indexOf(this.state.background) === this.state.backgrounds.length - 1) {
            this.setState({
                background: this.state.backgrounds[0]
            });

            return;
        }

        this.setState({
            background: this.state.backgrounds[this.state.backgrounds.indexOf(this.state.background) + 1]
        });
    },

    previousCar () {
        if (this.state.cars.length === 1) {
            return;
        }

        if (this.state.cars.indexOf(this.state.car) === 0) {
            this.setState({
                car: this.state.cars[this.state.cars.length - 1]
            });

            return;
        }

        this.setState({
            car: this.state.cars[this.state.cars.indexOf(this.state.car) - 1]
        });
    },

    nextCar () {
        if (this.state.cars.length === 1) {
            return;
        }

        if (this.state.cars.indexOf(this.state.car) === this.state.cars.length - 1) {
            this.setState({
                car: this.state.cars[0]
            });

            return;
        }

        this.setState({
            car: this.state.cars[this.state.cars.indexOf(this.state.car) + 1]
        });
    },

    onReady (event) {
        event.target.setVolume(100);
    },

    playSong (url) {
        var matches = url.match(/\?v=(.*)&|\?v=(.*)$/);
        var videoId = matches[1] ? matches[1] : matches[2];

        this.setState({
            currentSong: url,
            songPaused: false
        });

        this.refs.youtube._internalPlayer.loadVideoById(videoId);
        this.refs.youtube._internalPlayer.playVideo();
    },

    pauseSong () {
        this.refs.youtube._internalPlayer.pauseVideo();

        this.setState({
            songPaused: true
        });
    },

    render () {
        return (
            <div>
                <YouTube
                    className="hidden"
                    onReady={this.onReady}
                    ref="youtube"
                />
                <Background
                    background={this.state.background}
                    car={this.state.car}
                />
                <div style={{position: 'fixed', left: '3%', top: '5%', opacity: '0.5'}}>
                    <Button bsStyle="default" onClick={this.previousBackground}>
                        <Glyphicon glyph="triangle-left"/>
                    </Button>
                </div>
                <div style={{position: 'fixed', right: '3%', top: '5%', opacity: '0.5'}}>
                    <Button bsStyle="default" onClick={this.nextBackground}>
                        <Glyphicon glyph="triangle-right"/>
                    </Button>
                </div>
                <div style={{position: 'fixed', left: '3%', bottom: '5%', opacity: '0.5'}}>
                    <Button bsStyle="default" onClick={this.previousCar}>
                        <Glyphicon glyph="triangle-left"/>
                    </Button>
                </div>
                <div style={{position: 'fixed', right: '3%', bottom: '5%', opacity: '0.5'}}>
                    <Button bsStyle="default" onClick={this.nextCar}>
                        <Glyphicon glyph="triangle-right"/>
                    </Button>
                </div>
                <Panel
                    collapsible
                    defaultExpanded
                    style={this.state.playlistStyle}
                >
                    <Table fill hover striped>
                        <thead>
                        </thead>
                        <tbody>
                            {this.state.songs.map(song =>
                                <tr key={song.id}>
                                    <td>
                                        <span>{`${song.id}. ${song.name}`}</span>
                                        {this.state.currentSong === song.url && !this.state.songPaused
                                            ? <Button bsStyle="danger" onClick={this.pauseSong.bind(this)} style={{float: 'right'}}>
                                                <Glyphicon glyph="pause"/>
                                            </Button>
                                            : null}
                                        {this.state.currentSong !== song.url || this.state.songPaused
                                            ? <Button bsStyle="success" onClick={this.playSong.bind(this, song.url)} style={{float: 'right'}}>
                                                <Glyphicon glyph="play"/>
                                            </Button>
                                            : null
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Panel>
                <Logos/>
            </div>
        );
    }
});

export default Playlist;
