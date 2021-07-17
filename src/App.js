import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import NewQuestion from './components/NewQuestion'
import ProtectedRoute from './components/ProtectedRoute'
import QuestionDetail from './components/QuestionDetail'

import Dashboard from './containers/Dashboard'
import Leaderboard from './containers/Leaderboard'
import Login from './containers/Login'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  

  render() {
  return (
    <Router>
      <Fragment>
          <div className='container'>
          <Nav />
							<div className="main-content"> 
								<Switch>
									<Route path="/" exact component={Login}/>
									<ProtectedRoute path='/dashboard' exact component={Dashboard} />
                  <ProtectedRoute path='/add' exact component={NewQuestion} />
                  <ProtectedRoute path='/question/:id' component={QuestionDetail} />
									<ProtectedRoute path='/leaderboard' component={Leaderboard} />
									<Route path="/not-found" component={NotFound} />
								</Switch>
							</div>

          </div>
      </Fragment>
    </Router>
  );
  }
}

export default connect()(App);
