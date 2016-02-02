import React from 'react';
import { Button, Glyphicon, Panel, Table } from 'react-bootstrap';

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

    },

    nextBackground () {

    },

    previousCar () {

    },

    nextCar () {

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
                                            <Glyphicon glyph="play" />
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                 </Panel>
            </div>
        );
    }
});

export default Playlist;
