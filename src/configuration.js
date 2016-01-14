import React from 'react';
import { Button, Col, Glyphicon, Modal, Panel, Row } from 'react-bootstrap';

import BackgroundsApi from './BackgroundsApi';
import CarsApi from './CarsApi';

const AddSong = React.createClass({
    getInitialState () {
        return {
            backgrounds: [],
            cars: [],
            showConfigurationModal: false
        };
    },

    componentDidMount () {
        this.downloadBackgrounds();
        this.downloadCars();
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

    handleConfigurationShowing () {
        this.setState({
            showConfigurationModal: true
        });
    },

    handleDismiss () {
        this.setState({
            showConfigurationModal: false
        });
    },

    handleConfigurationSaving () {
        console.log('Configuration saved');
        this.setState({
            showConfigurationModal: false
        });
    },

    render () {
        return (
            <div style={{position: 'fixed', right: '3%', top: '5%'}}>
                <Button bsStyle="success" onClick={this.handleConfigurationShowing}>
                        <Glyphicon glyph="cog"/>
                </Button>
                <Modal onHide={this.handleDismiss} show={this.state.showConfigurationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title><span><Glyphicon glyph="cog"/>{' Configuration'}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={6}>
                                <Panel header={<span><Glyphicon glyph="road" />{' Cars'}</span>}>
                                    {this.state.cars.map(car => (
                                        <div key={car} style={this.imageContainerStyle}>
                                            <img src={'../public/cars/' + car} style={{margin: '5% 0', width: '100%'}}/>
                                        </div>
                                    ))}
                                </Panel>
                            </Col>
                            <Col xs={6}>
                                <Panel header={<span><Glyphicon glyph="picture" />{' Backgrounds'}</span>}>
                                    {this.state.backgrounds.map(background => (
                                        <div key={background} style={this.imageContainerStyle}>
                                            <img src={'../public/backgrounds/' + background} style={{margin: '5% 0', width: '100%'}}/>
                                        </div>
                                    ))}
                                </Panel>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.handleConfigurationSaving}>
                            <Glyphicon glyph="ok"/> {'Confirm'}
                        </Button>
                        <Button bsStyle="danger" onClick={this.handleDismiss}>
                            <Glyphicon glyph="remove"/> {'Cancel'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

export default AddSong;
