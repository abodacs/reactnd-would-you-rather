import React, { Component, Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { resetAuthedUser } from '../actions/authedUser';
import Avatar from './Avatar';

import { connect } from 'react-redux'
    
class NavigationBar extends Component {
    render() {
        const { user, authedUser, dispatch } = this.props
        const avatar = user ? user.avatarURL : 'placeholder.png'
        const name = user ? user.name : ''

        const handleLogout = () => {
            dispatch(resetAuthedUser());
        };

        return (
            <Fragment>
                <Navbar expand="lg" bg="light" variant="light" className="border mb-3">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <h2>
                            <small>WYR...?</small>
                        </h2>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/dashboard" exact>
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/add" exact>
                                New Question
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/leaderboard" exact>
                                Leaderboard
                            </Nav.Link>
                        </Nav>
                        
						{
                    authedUser
                    && <Nav className="justify-content-end"> 
                        <Navbar.Text>Hello {name}</Navbar.Text>
                            <Avatar avatarURL={avatar} className="mx-3" alt={`Avatar of ${authedUser}`} />
                            <Button
                                variant="outline-dark"
                                onClick={handleLogout}
                                className="mt-3 mt-lg-0"
                            >
                                Logout
                            </Button>
                        </Nav>
					
                }
             
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
        </Fragment>
    )
    }
}

function mapStateToProps( { authedUser, users}, props) {
    return {
        authedUser,
        users,
        user: users[authedUser]
    }

}
export default connect(mapStateToProps)(NavigationBar)