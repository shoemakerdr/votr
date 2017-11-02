import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer'
import AllPolls from './components/AllPolls'
import { BrowserRouter as Router, Route } from 'react-router-dom'

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
                    <Route path='/allpolls' component={AllPolls} />
                    <Footer />
                </div>
            </Router>
      </div>
    );
  }
}

export default App;
