import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
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
            <div className='tile-item login'>
                <div className="tile-header"><div>Welcome To Would You Rather App</div></div>
                <div className='user-select'>
					<div>Please sign in to continue</div>
                    <select id="login-select" value={selected} onChange={(event) => this.handleUserSelectionChanged(event)}>
						<option value="-1" disabled>Select user...</option>
						{Object.keys(users).map(function(key) {
							return (
								<option value={users[key].id} key={key}>
									{users[key].name}
								</option>
							);
						})}
					</select>
                </div>
				<button
					className='btn'
					disabled={userId === null}
					onClick={(event) => this.handleLogin(event)}>
					Login
				</button>
            </div>
        )
        }

}

function mapStateToProps ({users}) {  
    return {
      users,
    };
  }


export default withRouter(connect(mapStateToProps)(Login))