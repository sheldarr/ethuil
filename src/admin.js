import React from 'react';

import _ from 'lodash';

import { Button, Col, Glyphicon, Grid, Nav, Navbar, NavItem, Panel, Row, Table } from 'react-bootstrap';

import BackgroundsApi from './BackgroundsApi';
import CarsApi from './CarsApi';
import ConfirmationModal from './ConfirmationModal';
import ImageDropzone from './ImageDropzone';
import SongsApi from './SongsApi';

const Admin = React.createClass({
    getInitialState () {
        return {
            backgrounds: [],
            cars: [],
            confirmationModalBody: '',
            confirmationModalHeader: '',
            handleModalConfirmation: () => 0,
            objectToRemove: {},
            showConfirmationModal: false,
            songs: []
        };
    },

    componentDidMount () {
        BackgroundsApi.getAll()
            .then(response => {
                this.setState({
                    backgrounds: response
                });
            })
            .catch(error => {
                alert('Api error ' + error);
            });

        CarsApi.getAll()
            .then(response => {
                this.setState({
                    cars: response
                });
            })
            .catch(error => {
                alert('Api error ' + error);
            });

        SongsApi.getAll()
            .then(response => {
                this.setState({
                    songs: response
                });
            })
            .catch(error => {
                alert('Api error ' + error);
            });
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

    showRemoveCarModal (name) {
        this.setState({
            confirmationModalBody: `Do you really want to remove ${name}?`,
            confirmationModalHeader: `Remove ${name}`,
            handleModalConfirmation: this.handleCarRemove,
            objectToRemove: { name: name },
            showConfirmationModal: true
        });
    },

    handleCarRemove () {
        var cars = _.clone(this.state.cars, true);

        _.remove(cars, {name: this.state.objectToRemove.name});

        this.setState({
            cars: cars,
            showConfirmationModal: false
        });
    },

    showRemoveBackgroundModal (name) {
        this.setState({
            confirmationModalBody: `Do you really want to remove ${name}?`,
            confirmationModalHeader: `Remove ${name}`,
            handleModalConfirmation: this.handleBackgroundRemove,
            objectToRemove: { name: name },
            showConfirmationModal: true
        });
    },

    handleBackgroundRemove () {
        var backgrounds = _.clone(this.state.backgrounds, true);

        _.remove(backgrounds, {name: this.state.objectToRemove.name});

        this.setState({
            backgrounds: backgrounds,
            showConfirmationModal: false
        });
    },

    showRemoveSongModal (name) {
        this.setState({
            confirmationModalBody: `Do you really want to remove ${name}?`,
            confirmationModalHeader: `Remove ${name}`,
            handleModalConfirmation: this.handleSongRemove,
            objectToRemove: { name: name },
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

    handleCarDrop (car) {
        console.log('Drop', car);

        CarsApi.create(car)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                alert('Api error ' + error);
            });
    },

    handleBackgroundDrop (background) {
        console.log('Drop', background);
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
                                        <div key={car} style={this.imageContainerStyle}>
                                            <img src={'../public/cars/' + car} style={this.imageStyle}/>
                                            <Button
                                                bsStyle="danger"
                                                onClick={this.showRemoveCarModal.bind(this, car)}
                                                style={this.deleteButtonStyle}
                                            >
                                                <Glyphicon glyph="remove" />
                                            </Button>
                                        </div>
                                    ))
                                }
                                <ImageDropzone onDrop={this.handleCarDrop}/>
                            </Panel>
                        </Col>
                        <Col xs={6}>
                            <Panel header={<span><Glyphicon glyph="picture" />{' Backgrounds'}</span>}>
                                {
                                    this.state.backgrounds.map(background => (
                                        <div key={background} style={this.imageContainerStyle}>
                                            <img src={'../public/backgrounds/' + background} style={this.imageStyle}/>
                                            <Button
                                                bsStyle="danger"
                                                onClick={this.showRemoveBackgroundModal.bind(this, background)}
                                                style={this.deleteButtonStyle}
                                            >
                                                <Glyphicon glyph="remove" />
                                            </Button>
                                        </div>
                                    ))
                                }
                                <ImageDropzone onDrop={this.handleBackgroundDrop}/>
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
