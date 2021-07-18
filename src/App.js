import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import NavigationBar from './components/NavigationBar'
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
      <Container>
              <NavigationBar />
							<main>
								<Switch>
									<Route path="/" exact component={Login}/>
									<ProtectedRoute path='/dashboard' exact component={Dashboard} />
                  <ProtectedRoute path='/add' exact component={NewQuestion} />
                  <ProtectedRoute path='/questions/:id' component={QuestionDetail} />
									<ProtectedRoute path='/leaderboard' component={Leaderboard} />
									<Route path="/not-found" component={NotFound} />
								</Switch>
              </main>
      </Container>
    </Router>
  );
  }
}

export default connect()(App);
