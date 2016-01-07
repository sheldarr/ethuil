const React = require('react');

const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;

const Glyphicon = require('react-bootstrap').Glyphicon;
const Nav = require('react-bootstrap').Nav;
const Navbar = require('react-bootstrap').Navbar;
const NavItem = require('react-bootstrap').NavItem;
const Panel = require('react-bootstrap').Panel;

const ImageDropzone = require('./ImageDropzone');

module.exports = React.createClass({
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
                                <ImageDropzone />
                            </Panel>
                        </Col>
                        <Col xs={6}>
                            <Panel header={<span><Glyphicon glyph="picture" />{' Backgrounds'}</span>}>
                                <ImageDropzone />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Panel header={<span><Glyphicon glyph="music" />{' Playlist'}</span>}>
                                <ImageDropzone />
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
