import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer'
import AllPolls from './components/AllPolls'
import Poll from './components/Poll'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path='/polls' component={AllPolls} />
                        <Route path='/polls/:poll_id' component={Poll} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
      </div>
    );
  }
}

export default App;
