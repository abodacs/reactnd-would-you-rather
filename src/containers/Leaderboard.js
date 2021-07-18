import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import UserStats from '../components/UserStats'

class Leaderboard extends Component {
    render() {
        const { users} = this.props
        const sortedUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

        return (
            <Fragment>
				<h2 className="text-center my-3">
					<small>LeaderBoard</small>
				</h2>
                {sortedUsers.map((user) => (
                    <UserStats key={user.id} id={user.id} user={user} />
                ))}
            </Fragment>
        )
    }
}

function mapStateToProps( { users }) {
    const usersList = Object.values(users)
    usersList.map( (user) => user.totalScore = Object.keys(user.answers).length + user.questions.length )
    return {
        users: usersList
    }
}

export default connect(mapStateToProps)(Leaderboard);