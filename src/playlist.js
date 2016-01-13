import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

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

    render () {
        return (
            <Grid style={this.state.playlistStyle}>
                {this.state.songs.map(song =>
                    <div key={song.id}>
                        <Row>
                            <Col xs={12}>
                                <div>{`${song.id}.${song.name}`}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <div>{song.url}</div>
                            </Col>
                        </Row>
                    </div>
                )}
            </Grid>
        );
    }
});

export default Playlist;
