import React from 'react';

import { Button, Col, Glyphicon, Grid, Nav, Navbar, NavItem, Panel, Row, Table } from 'react-bootstrap';

import AddSong from './addSong.jsx';
import AuthenticationApi from './authenticationApi.jsx';
import BackgroundsApi from './backgroundsApi.jsx';
import CarsApi from './carsApi.jsx';
import ConfirmationModal from './confirmationModal.jsx';
import ImageDropzone from './imageDropzone.jsx';
import SongsApi from './songsApi.jsx';

const Admin = React.createClass({
    propTypes: {
        params: React.PropTypes.shape({
            authenticationKey: React.PropTypes.string
        })
    },

    getInitialState () {
        return {
            authenticated: false,
            backgrounds: [],
            cars: [],
            confirmationModalBody: '',
            confirmationModalHeader: '',
            handleModalConfirmation: () => 0,
            objectToRemove: {},
            showConfirmationModal: false,
            songs: [],
            uploadingBackground: false,
            uploadingCar: false
        };
    },

    componentDidMount () {
        this.authenticate();
        this.downloadBackgrounds();
        this.downloadCars();
        this.downloadSongs();
    },

    authenticate () {
        AuthenticationApi.authenticate(this.props.params.authenticationKey)
            .then(response => {
                this.setState({
                    authenticated: true
                });
            })
            .catch(error => {
                alert(error);
            });
    },

    downloadBackgrounds () {
        BackgroundsApi.getAll()
            .then(response => {
                this.setState({
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
        BackgroundsApi.delete(this.state.objectToRemove.name)
            .then(response => {
                this.downloadBackgrounds();
            })
            .catch(error => {
                alert(error);
            });

        this.setState({
            showConfirmationModal: false
        });
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
        CarsApi.delete(this.state.objectToRemove.name)
            .then(response => {
                this.downloadCars();
            })
            .catch(error => {
                alert(error);
            });

        this.setState({
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
        SongsApi.delete(this.state.objectToRemove.id)
            .then(response => {
                this.downloadSongs();
            })
            .catch(error => {
                alert(error);
            });

        this.setState({
            showConfirmationModal: false
        });
    },

    handleModalDismiss () {
        this.setState({
            showConfirmationModal: false
        });
    },

    handleCarDrop (car) {
        this.setState({
            uploadingCar: true
        });

        CarsApi.create(car)
            .then(response => {
                this.setState({
                    uploadingCar: false
                });
                this.downloadCars();
            })
            .catch(error => {
                this.setState({
                    uploadingCar: false
                });
                alert(error);
            });
    },

    handleBackgroundDrop (background) {
        this.setState({
            uploadingBackground: true
        });

        BackgroundsApi.create(background)
            .then(response => {
                this.setState({
                    uploadingBackground: false
                });
                this.downloadBackgrounds();
            })
            .catch(error => {
                this.setState({
                    uploadingBackground: false
                });
                alert(error);
            });
    },

    handleSongAdding () {
        this.downloadSongs();
    },

    render () {
        if (!this.state.authenticated) {
            return null;
        }

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {this.props.params.authenticationKey}
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
                                {this.state.cars.map(car => (
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
                                ))}
                                <ImageDropzone
                                    onDrop={this.handleCarDrop}
                                    uploading={this.state.uploadingCar}
                                />
                            </Panel>
                        </Col>
                        <Col xs={6}>
                            <Panel header={<span><Glyphicon glyph="picture" />{' Backgrounds'}</span>}>
                                {this.state.backgrounds.map(background => (
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
                                ))}
                                <ImageDropzone
                                    onDrop={this.handleBackgroundDrop}
                                    uploading={this.state.uploadingBackground}
                                />
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
                                <AddSong onSuccess={this.handleSongAdding}/>
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
