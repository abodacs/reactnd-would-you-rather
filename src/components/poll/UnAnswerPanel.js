import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { handleAddAnswer } from '../../actions/questions'
import { formatDate } from '../../utils/helpers'
import { Redirect } from 'react-router-dom'
import Avatar from '../Avatar'

class UnAnswerPanel extends Component {
	state = {
		errorMsg: ''
	}

	handleSaveAnswer = (id, e) => {
		e.preventDefault();
		const answer = this.form.answer.value;
		const { dispatch, authedUser } = this.props;

		if (answer !== '') {
            dispatch(handleAddAnswer({
                qid:id,
                authedUser,
                answer: answer,
              }))
		} else {
			this.setState({ errorMsg: 'You must make a choice' });
		}
	};

	render() {
		const { question, author } = this.props;
		if (question === null) {
            return <Redirect to="/not-found"/>
		}
        const { errorMsg } = this.state;
		const { optionOne, optionTwo, timestamp, id } = question;
		const { name, avatarURL } = author;
	
		return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
						<Card.Header>
							<Avatar avatarURL={avatarURL} className="mr-2" />
							{name} asks:
						</Card.Header>
						<Card.Body className="d-flex justify-content-center">
							<Form
								onSubmit={(e) => this.handleSaveAnswer(id, e)}
								ref={(f) => (this.form = f)}
							>
								{errorMsg ? (
									<p className="text-danger">{errorMsg}</p>
								) : null}
								<Form.Check
									custom
									type="radio"
									id="optionOne"
									label={optionOne.text}
									value="optionOne"
									name="answer"
									className="mb-2"
								/>
								<Form.Check
									custom
									type="radio"
									id="optionTwo"
									label={optionTwo.text}
									value="optionTwo"
									name="answer"
									className="mb-2"
								/>
								<Button type="submit" variant="outline-dark">
									Vote
								</Button>
							</Form>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">{formatDate(timestamp)}</small>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		);
	}
}

function mapStateToProps({authedUser, questions, users }, { id }) {
	const question = questions[id];

	return {
        authedUser,
		question: question ? question : null,
		author: question ? users[question.author] : null
	};
}

export default connect(mapStateToProps)(UnAnswerPanel);