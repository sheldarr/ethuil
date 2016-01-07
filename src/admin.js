const React = require('react');

const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;

const Nav = require('react-bootstrap').Nav;
const Navbar = require('react-bootstrap').Navbar;
const NavItem = require('react-bootstrap').NavItem;

const Glyphicon = require('react-bootstrap').Glyphicon;

const Panel = require('react-bootstrap').Panel;

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
                                {'Panel Content'}
                            </Panel>
                        </Col>
                        <Col xs={6}>
                            <Panel header={<span><Glyphicon glyph="picture" />{' Backgrounds'}</span>}>
                                {'Panel Content'}
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Panel header={<span><Glyphicon glyph="music" />{' Playlist'}</span>}>
                                {'Panel Content'}
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
