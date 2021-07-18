import React, { Component } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'

import PublicRoutes from './components/routes/PublicRoutes'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  

  render() {
    return (
      <Router>
         <PublicRoutes />
      </Router>
    )
  }
}

export default connect()(App);
