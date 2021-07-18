import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'

const AnswerOption = (props) => {
    const { option, optionPercent, authedUser, totalVotes } = props;

    return (
        <Fragment>
            <li>
            {option.text}
            {option.votes.includes(authedUser) ? (
                <span className="text-danger ml-2">
                    &lt;- Your choice
                </span>
                ) : null}
            </li>
            <ProgressBar
                now={optionPercent}
                label={`${optionPercent}%`}
                variant="info"
            />
            <Card.Text className="text-muted">
                chosen by {option.votes.length} out of {totalVotes}{' '}
                users
            </Card.Text>
        </Fragment>
    )

}

export default AnswerOption