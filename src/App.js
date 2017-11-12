import React, { Component } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import PollList from './components/PollList'
import Poll from './components/Poll'
import Register from './components/Register'
import Login from './components/Login'
import NewPoll from './components/NewPoll'
import UserPage from './components/UserPage'
import Signout from './components/Signout'
import NotFoundPage from './components/NotFoundPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
    constructor () {
        super()
        this.logInUser = this.logInUser.bind(this)
        this.signOutUser = this.signOutUser.bind(this)
        this.defaultState = {
            userInfo: {
                isLoggedIn: true,
                username: 'derek'
            }
        }
        this.state = this.defaultState
    }

    logInUser () {
        this.setState(this.defaultState)
    }

    signOutUser () {
        this.setState({
            userInfo: {
                isLoggedIn: false,
                username: ''
            }
        })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Nav userInfo={this.state.userInfo} />
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/polls' render={props => (
                                <PollList {...props} />
                            )}/>
                            <Route path='/polls/:poll_id' render={props => (
                                    <Poll
                                        {...props}
                                        userInfo={this.state.userInfo}
                                    />
                            )} />
                            <Route path='/newpoll' render={props => (
                                <NewPoll
                                    {...props}
                                    userInfo={this.state.userInfo}
                                />
                            )} />
                            <Route path='/users/:user_id' render={props => (
                                <UserPage
                                    {...props}
                                    userInfo={this.state.userInfo}
                                />
                            )} />
                            <Route path='/register' render={props => (
                                <Register {...props} />
                            )} />
                            <Route path='/login' render={props => (
                                <Login
                                    {...props}
                                    logInUser={this.logInUser}
                                />
                            )} />
                            <Route path='/signout' render={() => (
                                <Signout signOutUser={this.signOutUser}/>
                            )} />
                            <Route path='*' render={() => (
                                <NotFoundPage />
                            )} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
