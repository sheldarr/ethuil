import React from 'react';

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
                name: 'Pink Floyd - The Wall',
                url: 'http://song'
            }, {
                name: 'Pink Floyd - Mother',
                url: 'http://song'
            }, {
                name: 'Pink Floyd - The Wall',
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
                                            <Button bsStyle="danger" style={this.deleteButtonStyle}><Glyphicon glyph="remove" /></Button>
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
                                            <Button bsStyle="danger" style={this.deleteButtonStyle}><Glyphicon glyph="remove" /></Button>
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
                                            <tr key={song.name}>
                                                <td>
                                                </td>
                                                <td>
                                                    {song.name}
                                                </td>
                                                <td>
                                                    {song.url}
                                                </td>
                                                <td>
                                                    <div className="pull-right">
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

export default Admin;
