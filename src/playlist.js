import React from 'react';
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap';

import Background from './Background';
import SongsApi from './SongsApi';

const Playlist = React.createClass({
    getInitialState () {
        return {
            playlistStyle: {
                background: 'white',
                boxShadow: '0 0 20px black',
                marginLeft: '58%',
                marginTop: '17%',
                maxHeight: '40%',
                overflowY: 'scroll',
                padding: '20px',
                position: 'fixed',
                width: '22%'
            },
            imageStyle: {
                left: 0,
                maxWidth: '100%',
                position: 'fixed',
                top: 0
            },
            songs: []
        };
    },

    componentDidMount () {
        this.downloadSongs();

        Background.set('url');
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

    render () {
        return (
            <Grid style={this.state.playlistStyle}>
                <Row style={{marginBottom: '10px'}}>
                    <Col xs={12}>
                        <Glyphicon glyph="music" style={{marginRight: '10px'}}/><strong>{'Playlist'}</strong>
                    </Col>
                </Row>
                {this.state.songs.map(song =>
                    <div key={song.id}>
                        <Row>
                            <Col xs={10}>
                                <div>{`${song.id}.${song.name}`}</div>
                            </Col>
                            <Col xs={2}>
                                <Button bsStyle="success" onClick={this.openSongInNewTab.bind(this, song.url)}>
                                    <Glyphicon glyph="play" />
                                </Button>
                            </Col>
                        </Row>
                        <br/>
                    </div>
                )}
            </Grid>
        );
    }
});

export default Playlist;
