import React from 'react';

import _ from 'lodash';

import { Button, Col, Glyphicon, Grid, Nav, Navbar, NavItem, Panel, Row, Table } from 'react-bootstrap';

import ImageDropzone from './ImageDropzone';

const Admin = React.createClass({
    getInitialState () {
        return {
            backgrounds: [{
                name: 'outside_1.jpg'
            }],
            cars: [{
                name: 'inside_1.jpg'
            }],
            songs: [{
                id: 1,
                name: 'Pink Floyd - Hey You',
                url: 'http://song'
            }, {
                id: 2,
                name: 'Pink Floyd - Money',
                url: 'http://song'
            }, {
                id: 3,
                name: 'Pink Floyd - Wish You Were Here',
                url: 'http://song'
            }]
        };
    },

    imageContainerStyle: {
        display: 'inline-block',
        height: '128px',
        margin: '0 1%',
        width: '46%'
    },

    imageStyle: {
        height: '100%',
        width: '100%'
    },

    deleteButtonStyle: {
        bottom: '90%',
        left: '80%',
        position: 'relative'
    },

    handleCarRemove (name) {
        var cars = _.clone(this.state.cars, true);

        _.remove(cars, {name: name});

        this.setState({
            cars: cars
        });
    },

    handleBackgroundRemove (name) {
        var backgrounds = _.clone(this.state.backgrounds, true);

        _.remove(backgrounds, {name: name});

        this.setState({
            backgrounds: backgrounds
        });
    },

    handleSongRemove (id) {
        var songs = _.clone(this.state.songs, true);

        _.remove(songs, {id: id});

        this.setState({
            songs: songs
        });
    },

    render () {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">{'Administrator Panel'}</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="#">{'Playlist'}</NavItem>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row>
                        <Col xs={6}>
                            <Panel header={<span><Glyphicon glyph="road" />{' Cars'}</span>}>
                                {
                                    this.state.cars.map(car => (
                                        <div key={car.name} style={this.imageContainerStyle}>
                                            <img src={'../public/' + car.name} style={this.imageStyle}/>
                                            <Button bsStyle="danger" onClick={this.handleCarRemove.bind(this, car.name)} style={this.deleteButtonStyle}><Glyphicon glyph="remove" /></Button>
                                        </div>
                                    ))
                                }
                                <ImageDropzone />
                            </Panel>
                        </Col>
                        <Col xs={6}>
                            <Panel header={<span><Glyphicon glyph="picture" />{' Backgrounds'}</span>}>
                                {
                                    this.state.backgrounds.map(background => (
                                        <div key={background.name} style={this.imageContainerStyle}>
                                            <img src={'../public/' + background.name} style={this.imageStyle}/>
                                            <Button bsStyle="danger" onClick={this.handleBackgroundRemove.bind(this, background.name)} style={this.deleteButtonStyle}><Glyphicon glyph="remove" /></Button>
                                        </div>
                                    ))
                                }
                                <ImageDropzone />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Panel header={<span><Glyphicon glyph="music" />{' Playlist'}</span>}>
                                <Table hover striped >
                                        <thead>
                                            <tr>
                                                <td>{'Id'}</td>
                                                <td>{'Name'}</td>
                                                <td>{'URL'}</td>
                                                <td></td>
                                            </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.songs.map(song =>
                                            <tr key={song.id}>
                                                <td>
                                                    {song.id}
                                                </td>
                                                <td>
                                                    {song.name}
                                                </td>
                                                <td>
                                                    {song.url}
                                                </td>
                                                <td>
                                                    <div className="pull-right">
                                                        <Button bsStyle="danger" onClick={this.handleSongRemove.bind(this, song.id)}>
                                                            <Glyphicon glyph="remove" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Button block bsStyle="success"><Glyphicon glyph="plus"/>{' Add new song'}</Button>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

export default Admin;
