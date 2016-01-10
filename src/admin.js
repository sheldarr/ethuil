import React from 'react';

import _ from 'lodash';

import { Button, Col, Glyphicon, Grid, Nav, Navbar, NavItem, Panel, Row, Table } from 'react-bootstrap';

import ConfirmationModal from './ConfirmationModal';
import ImageDropzone from './ImageDropzone';

const Admin = React.createClass({
    getInitialState () {
        return {
            backgrounds: [{
                id: 1,
                name: 'outside_1.jpg'
            }, {
                id: 2,
                name: 'inside_1.jpg'
            }],
            cars: [{
                id: 1,
                name: 'inside_1.jpg'
            }],
            confirmationModalBody: '',
            confirmationModalHeader: '',
            handleModalConfirmation: () => 0,
            objectToRemove: {},
            showConfirmationModal: false,
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
        float: 'left',
        height: '128px',
        margin: '1% 1%',
        width: '48%'
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

    showRemoveCarModal (id, name) {
        this.setState({
            confirmationModalBody: `Do you really want to remove ${name}?`,
            confirmationModalHeader: `Remove ${name}`,
            handleModalConfirmation: this.handleCarRemove,
            objectToRemove: { id: id },
            showConfirmationModal: true
        });
    },

    handleCarRemove () {
        var cars = _.clone(this.state.cars, true);

        _.remove(cars, {id: this.state.objectToRemove.id});

        this.setState({
            cars: cars,
            showConfirmationModal: false
        });
    },

    showRemoveBackgroundModal (id, name) {
        this.setState({
            confirmationModalBody: `Do you really want to remove ${name}?`,
            confirmationModalHeader: `Remove ${name}`,
            handleModalConfirmation: this.handleBackgroundRemove,
            objectToRemove: { id: id },
            showConfirmationModal: true
        });
    },

    handleBackgroundRemove () {
        var backgrounds = _.clone(this.state.backgrounds, true);

        _.remove(backgrounds, {id: this.state.objectToRemove.id});

        this.setState({
            backgrounds: backgrounds,
            showConfirmationModal: false
        });
    },

    showRemoveSongModal (id, name) {
        this.setState({
            confirmationModalBody: `Do you really want to remove ${name}?`,
            confirmationModalHeader: `Remove ${name}`,
            handleModalConfirmation: this.handleSongRemove,
            objectToRemove: { id: id },
            showConfirmationModal: true
        });
    },

    handleSongRemove () {
        var songs = _.clone(this.state.songs, true);

        _.remove(songs, {id: this.state.objectToRemove.id});

        this.setState({
            showConfirmationModal: false,
            songs: songs
        });
    },

    handleModalDismiss () {
        this.setState({
            showConfirmationModal: false
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
                                        <div key={car.id} style={this.imageContainerStyle}>
                                            <img src={'../public/' + car.name} style={this.imageStyle}/>
                                            <Button
                                                bsStyle="danger"
                                                onClick={this.showRemoveCarModal.bind(this, car.id, car.name)}
                                                style={this.deleteButtonStyle}
                                            >
                                                <Glyphicon glyph="remove" />
                                            </Button>
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
                                        <div key={background.id} style={this.imageContainerStyle}>
                                            <img src={'../public/' + background.name} style={this.imageStyle}/>
                                            <Button
                                                bsStyle="danger"
                                                onClick={this.showRemoveBackgroundModal.bind(this, background.id, background.name)}
                                                style={this.deleteButtonStyle}
                                            >
                                                <Glyphicon glyph="remove" />
                                            </Button>
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
                                                        <Button bsStyle="danger" onClick={this.showRemoveSongModal.bind(this, song.id, song.name)}>
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
                <ConfirmationModal
                    body={this.state.confirmationModalBody}
                    header={this.state.confirmationModalHeader}
                    onConfirmation={this.state.handleModalConfirmation}
                    onDismiss={this.handleModalDismiss}
                    show={this.state.showConfirmationModal}
                />
            </div>
        );
    }
});

export default Admin;
