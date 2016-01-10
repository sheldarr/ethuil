import React from 'react';

import { Button, Glyphicon, Modal } from 'react-bootstrap';

const ConfirmationModal = React.createClass({
    propTypes: {
        body: React.PropTypes.string.isRequired,
        header: React.PropTypes.string.isRequired,
        onConfirmation: React.PropTypes.func.isRequired,
        onDismiss: React.PropTypes.func.isRequired,
        show: React.PropTypes.bool.isRequired
    },

    handleConfirmation () {
        this.props.onConfirmation();
    },

    handleDismiss () {
        this.props.onDismiss();
    },

    render () {
        return (
            <Modal onHide={this.handleClose} show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.body}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.handleConfirmation}><Glyphicon glyph="ok"/>{' Yes'}</Button>
                    <Button bsStyle="danger" onClick={this.handleDismiss}><Glyphicon glyph="remove"/>{'No'}</Button>
                </Modal.Footer>
           </Modal>
       );
    }
});

export default ConfirmationModal;
