import React from 'react';
import { Button, Col, Glyphicon, Modal, Panel, Row } from 'react-bootstrap';

const Configuration = React.createClass({
    propTypes: {
        background: React.PropTypes.string.isRequired,
        backgrounds: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        car: React.PropTypes.string.isRequired,
        cars: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        onSave: React.PropTypes.func.isRequired
    },

    getInitialState () {
        return {
            selectedBackground: this.props.background,
            selectedCar: this.props.car,
            showConfigurationModal: false
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            selectedBackground: nextProps.background,
            selectedCar: nextProps.car
        });
    },

    handleConfigurationShowing () {
        this.setState({
            selectedBackground: this.props.background,
            selectedCar: this.props.car,
            showConfigurationModal: true
        });
    },

    handleDismiss () {
        this.setState({
            showConfigurationModal: false
        });
    },

    handleConfigurationSaving () {
        this.props.onSave(this.state.selectedBackground, this.state.selectedCar);

        this.setState({
            showConfigurationModal: false
        });
    },

    imageContainerStyle: {
        height: '128px',
        margin: '1% 1%'
    },

    imageStyle: {
        height: '100%',
        width: '100%'
    },

    selectButtonStyle: {
        bottom: '90%',
        left: '80%',
        position: 'relative'
    },

    selectBackground (background) {
        this.setState({
            selectedBackground: background
        });
    },

    selectCar (car) {
        this.setState({
            selectedCar: car
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
                                    {this.props.cars.map(car => (
                                        <div key={car} style={this.imageContainerStyle}>
                                            <img src={'../public/cars/' + car} style={this.imageStyle}/>
                                            <Button
                                                bsStyle="primary"
                                                onClick={this.selectCar.bind(this, car)}
                                                style={this.selectButtonStyle}
                                            >
                                                {this.state.selectedCar === car ? <Glyphicon glyph="ok" /> : <Glyphicon glyph="minus" />}
                                            </Button>
                                        </div>
                                    ))}
                                </Panel>
                            </Col>
                            <Col xs={6}>
                                <Panel header={<span><Glyphicon glyph="picture" />{' Backgrounds'}</span>}>
                                    {this.props.backgrounds.map(background => (
                                        <div key={background} style={this.imageContainerStyle}>
                                            <img src={'../public/backgrounds/' + background} style={this.imageStyle}/>
                                            <Button
                                                bsStyle="primary"
                                                onClick={this.selectBackground.bind(this, background)}
                                                style={this.selectButtonStyle}
                                            >
                                                {this.state.selectedBackground === background ? <Glyphicon glyph="ok" /> : <Glyphicon glyph="minus" />}
                                            </Button>
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

export default Configuration;
