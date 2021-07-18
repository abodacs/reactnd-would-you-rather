import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import NavigationBar from '../NavigationBar'
import NotFound from '../NotFound'
import NewQuestion from '../poll/NewQuestion'
import ProtectedRoute from '../routes/ProtectedRoute'
import QuestionDetail from '../poll/QuestionDetail'

import Dashboard from '../../containers/Dashboard'
import Leaderboard from '../../containers/Leaderboard'
import Login from '../../containers/Login'

const PublicRoutes = () => {
    return (
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
    )
}

export default PublicRoutes;