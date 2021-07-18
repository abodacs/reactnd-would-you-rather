import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { formatDate } from '../../utils/helpers'
import { Redirect } from 'react-router-dom'
import AnswerOption from './AnswerOption'
import Avatar from '../Avatar'


class AnswerPanel extends Component {
	render() {
		const { question, author, authedUser } = this.props;

		if (question === null) {
			return <Redirect to="/not-found"/>
		}

		const { optionOne, optionTwo, timestamp } = question
		const totalOptionOneVotes = optionOne.votes.length
		const totalOptionTwoVotes = optionTwo.votes.length
		const totalVotes = totalOptionOneVotes + totalOptionTwoVotes
		const optionOnePercent = Math.round((totalOptionOneVotes / totalVotes) * 100)
		const optionTwoPercent = Math.round((totalOptionTwoVotes / totalVotes) * 100)

		return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
						<Card.Header>
							<Avatar avatarURL={author.avatarURL} className="mr-2" />
							{author.name} asks:
						</Card.Header>

						<Card.Body className="d-flex justify-content-center">
							<ul>
								<AnswerOption 
									option={optionOne}
								 	optionPercent={optionOnePercent}
									authedUser={authedUser}
									totalVotes={totalVotes} />
								<AnswerOption 
									option={optionTwo}
									optionPercent={optionTwoPercent}
									authedUser={authedUser}
									totalVotes={totalVotes} />
							</ul>
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

function mapStateToProps({ questions, users, authedUser }, { id }) {
	const question = questions[id];

	return {
		question: question ? question : null,
		author: question ? users[question.author] : null,
		authedUser
	};
}

export default connect(mapStateToProps)(AnswerPanel);