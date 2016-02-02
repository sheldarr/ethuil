import React from 'react';
import { Button, Glyphicon, Image, Panel, Table } from 'react-bootstrap';

import Background from './background.jsx';
import BackgroundsApi from './backgroundsApi.jsx';
import CarsApi from './carsApi.jsx';
import SongsApi from './songsApi.jsx';

const Playlist = React.createClass({
    getInitialState () {
        return {
            background: '',
            backgrounds: [],
            car: '',
            cars: [],
            playlistStyle: {
                bottom: '5%',
                left: '60%',
                maxHeight: '50%',
                opacity: '0.5',
                overflowY: 'scroll',
                position: 'fixed',
                width: '25%'
            },
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

    openSongInNewTab (url) {
        let tab = window.open(url, '_blank');
        tab.focus();
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

    render () {
        return (
            <div>
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
                                        <Button bsStyle="success" onClick={this.openSongInNewTab.bind(this, song.url)} style={{float: 'right'}}>
                                            <Glyphicon glyph="play"/>
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Panel>
                <div
                    style={{
                        bottom: '2%',
                        left: '60%',
                        position: 'fixed',
                        width: '25%'
                    }}
                >
                    <a href="http://www.facebook.com">
                        <Image rounded src="/public/fb.png"
                            style={{
                                height: '30px',
                                width: '30px'
                            }}
                        />
                    </a>
                    <span
                        style={{
                            color: 'white',
                            float: 'right',
                            fontSize: '20px'
                        }}
                    >
                        {'Logo Space'}
                    </span>
                </div>
            </div>
        );
    }
});

export default Playlist;
