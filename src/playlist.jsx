import _ from 'lodash';
import React from 'react';
import { Button, Glyphicon, Panel, Table } from 'react-bootstrap';

import Background from './background.jsx';
import BackgroundsApi from './backgroundsApi.jsx';
import CarsApi from './carsApi.jsx';
import Configuration from './configuration.jsx';
import SongsApi from './songsApi.jsx';

const Playlist = React.createClass({
    getInitialState () {
        return {
            background: '',
            backgrounds: [],
            car: '',
            cars: [],
            playlistStyle: {
                left: '60%',
                maxHeight: '50%',
                overflowY: 'scroll',
                position: 'fixed',
                top: '30%',
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
                if (!localStorage.getItem('background')) {
                    localStorage.setItem('background', _.first(response));
                }

                this.setState({
                    background: localStorage.getItem('background'),
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
                if (!localStorage.getItem('car')) {
                    localStorage.setItem('car', _.first(response));
                }

                this.setState({
                    car: localStorage.getItem('car'),
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

    render () {
        return (
            <div>
                <Background
                    background={this.state.background}
                    car={this.state.car}
                />
                <Panel
                    collapsible
                    defaultExpanded
                    header={<span><Glyphicon glyph="music" style={{marginRight: '10px'}}/><strong>{'Playlist'}</strong></span>}
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
