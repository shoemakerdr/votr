import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import AllPolls from './components/AllPolls'
import Poll from './components/Poll'
import Register from './components/Register'
import Login from './components/Login'
import NewPoll from './components/NewPoll'
import UserPage from './components/UserPage'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Nav />
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/polls' component={AllPolls} />
                            <Route path='/newpoll' component={NewPoll} />
                            <Route path='/polls/:poll_id' component={Poll} />
                            <Route exact path='/users' render={() =>  (
                                <Redirect to='/' />
                            )}/>
                            <Route path='/users/:user_id' component={UserPage} />
                            <Route path='/register' component={Register} />
                            <Route path='/login' component={Login} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
