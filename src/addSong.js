import React from 'react';
import { Button, Col, Glyphicon, Input, Modal, Row } from 'react-bootstrap';

import SongsApi from './SongsApi';

const AddSong = React.createClass({
    propTypes: {
        onDismiss: React.PropTypes.func,
        onSuccess: React.PropTypes.func.isRequired
    },

    getInitialState () {
        return {
            name: '',
            showModal: false,
            url: ''
        };
    },

    componentDidMount () {
        this.setState({
            name: '',
            showModal: false,
            url: ''
        });
    },

    handleShowingModal () {
        this.setState({
            showModal: true
        });
    },

    handleDismiss () {
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }

        this.setState({
            showModal: false
        });
    },

    handleNameChange (event) {
        this.setState({
            name: event.target.value
        });
    },

    handleUrlChange (event) {
        this.setState({
            url: event.target.value
        });
    },

    handleSongAdding () {
        SongsApi.create({
            name: this.state.name,
            url: this.state.url
        }).then(response => {
            this.props.onSuccess();
        }).catch(error => {
            alert('Api error ' + error);
        });
    },

    render () {
        return (
            <div className="pull-right">
                <Button bsStyle="success" onClick={this.handleShowingModal} style={{marginLeft: 20}}>
                        <Glyphicon glyph="plus"/> {'Add Song'}
                </Button>
                <Modal onHide={this.handleDismiss} show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{'Add Song'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12}>
                                <Input
                                    label="Name"
                                    onChange={this.handleNameChange}
                                    type="text"
                                    value={this.state.name}
                                />
                                <Input
                                    label="Url"
                                    onChange={this.handleUrlChange}
                                    type="text"
                                    value={this.state.url}
                                />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.handleSongAdding}>
                            <Glyphicon glyph="plus"/> {'Add'}
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
