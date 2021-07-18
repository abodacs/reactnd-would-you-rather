import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { handleAddQuestion } from  '../actions/questions'

class NewQuestion extends Component {	
	state = {      
    	optionOneText:'',
		optionTwoText:'',
		toHome: false
	};

    handleSubmit = (event) => {   
    	event.preventDefault();

    	const { dispatch } = this.props
    	const { optionOneText, optionTwoText} = this.state
        dispatch(handleAddQuestion(
            optionOneText,
            optionTwoText
        ))
        this.setState({
        	optionOneText:'',
			optionTwoText:'',
			toHome: true
      	})
  	}

    handleQuestionTextChange = (event, type) => {
		const value = event.target.value;

		this.setState((state) => {
			return type === 'option1' ? {...state, optionOneText: value} : {...state, optionTwoText: value}
		});
	}

    render() {
        const {optionOneText, optionTwoText,  toHome } = this.state;

		if (toHome) {
			return <Redirect to='/dashboard' />
		}

        return (
			<Fragment>
				<h2 className="text-center m-3 would-you">
					<small>Would You Rather...</small>
				</h2>
				<Row className="justify-content-center">
					<Col xs={12} md={6}>
						<Card bg="light" className="m-3 text-center">
							<Card.Body>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="optionOneText">
										<Form.Label>Choice One</Form.Label>
										<Form.Control
											type="text"
											name="optionOneText"
											placeholder="Enter Option One Text Here"
											value={optionOneText}
											onChange={(event) => this.handleQuestionTextChange(event, 'option1')} 
										/>
									</Form.Group>
									<h3>
										<small>OR</small>
									</h3>
									<Form.Group controlId="optionTwoText">
										<Form.Label>Choice One</Form.Label>
										<Form.Control
											type="text"
											name="optionTwoText"
											placeholder="Enter Option Two Text Here"
											value={optionTwoText}
											onChange={(event) => this.handleQuestionTextChange(event, 'option2')} 
										/>
									</Form.Group>
									<Button
										type="submit"
										variant="outline-dark"
										disabled={optionOneText === '' || optionTwoText === ''} >
											Submit
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				</Fragment>
        )
    }        
}

export default connect()(NewQuestion);