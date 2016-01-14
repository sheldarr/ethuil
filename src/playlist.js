import React from 'react';
import { Button, Col, Glyphicon, Grid, Panel, Row, Table } from 'react-bootstrap';

import Background from './Background';
import SongsApi from './SongsApi';

const Playlist = React.createClass({
    getInitialState () {
        return {
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
        );
    }
});

export default Playlist;
