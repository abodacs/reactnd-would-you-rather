import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setAuthedUser, resetAuthedUser } from '../actions/authedUser';


class Login extends Component {
    state = {
		userId: null,
		toHome: false,
	}
    handleUserSelectionChanged  = (e) => {
        e.preventDefault()
        const userId = e.target.value;
        this.setState(function(previousState) {
            return {
              ...previousState,
              userId
            };
        });
   
    }
    handleLogin = (e) => {
        e.preventDefault()
        const { userId } = this.state;
        const { dispatch } = this.props

        dispatch(setAuthedUser(userId))
        
        this.setState(function(previousState) {
            return {
              ...previousState,
              toHome: true,
            };
        });

    }
    componentDidMount() {
        const { dispatch } = this.props
		dispatch(resetAuthedUser())
	}

    render() {
        const { userId, toHome } = this.state;
        const { users } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/dashboard'}}
		const selected = userId ? userId : -1

        // if authenticated user
        if(toHome) {
			return <Redirect to={from} />
		}
        
        return (
            <Row className="justify-content-center align-items-center">
				<Col xs={12} md={9}>
					<Card bg="light" className="text-center">
						<Card.Header>Welcome To Would You Rather App</Card.Header>
                        <Card.Body>
							<Form onSubmit={this.handleLogin}>
                                <Form.Group controlId="formGridState" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                    as="select"
                                    value={selected} onChange={(event) => this.handleUserSelectionChanged(event)}
                                    ref={(id) => (this.userID = id)}
									>
                                        <option value="-1" disabled>Select user...</option>
                                        {Object.keys(users).map(function(key) {
                                            return (
                                                <option value={users[key].id} key={key}>
                                                    {users[key].name}
                                                </option>
                                            );
                                        })}

                                    </Form.Control>
                                </Form.Group>
                                <Button type="submit" disabled={userId === null} className="w-100 btn btn-lg" variant="outline-dark">
                                        Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
        }

}

function mapStateToProps ({users}) {  
    return {
      users,
    };
  }


export default withRouter(connect(mapStateToProps)(Login))