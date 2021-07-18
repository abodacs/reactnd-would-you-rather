import React, { Component, Fragment} from 'react'
import { connect } from 'react-redux'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import QuestionsList from '../components/QuestionsList';

class Dashboard extends Component {     
    state = {
        showAnswered: false
    }
    filterQuestions = (showAnswered) => {
        this.setState((state) => {
            return { showAnswered: showAnswered }
        })
        
    }
    render() {
        const { answeredQuestionIds, unansweredQuestionIds } = this.props;

        return (
            <Fragment>
                <Tabs defaultActiveKey="unanswered" className="mb-3">
                    <Tab eventKey="unanswered" title="Unanswered Questions">
                        <QuestionsList
                            idsList={unansweredQuestionIds}
                            emptyListNote="Time to create some new ones! "
                        />
                    </Tab>
                    <Tab eventKey="answered" title="Answered Questions">
                        <QuestionsList
                            idsList={answeredQuestionIds}
                            emptyListNote="What are you waiting for???"
                        />
                    </Tab>
                </Tabs>
            </Fragment>            
        )
    }
}

function mapStateToProps( { questions, users, authedUser }) {
    const answeredQuestionIds = Object.keys(questions)
		.filter((id) => users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	const unansweredQuestionIds = Object.keys(questions)
		.filter((id) => !users[authedUser].answers.hasOwnProperty(id))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	return {
		answeredQuestionIds,
		unansweredQuestionIds
	};
}

export default connect(mapStateToProps)(Dashboard);