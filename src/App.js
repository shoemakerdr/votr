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
import { isLoggedIn, getUsername, saveUserInfo, clearUserInfo } from './authHelpers'
import votrApi from './votrApi'

class App extends Component {
    constructor () {
        super()
        this.loginUser = this.loginUser.bind(this)
        this.signOutUser = this.signOutUser.bind(this)
        this.checkUser = this.checkUser.bind(this)
        this.registerNewUser = this.registerNewUser.bind(this)
        this.defaultState = {
            userInfo: {
                isLoggedIn: isLoggedIn(),
                username: isLoggedIn() ? getUsername() : ''
            }
        }
        this.state = this.checkUser()
    }

    checkUser () {
        if (isLoggedIn())
            return this.defaultState
        else clearUserInfo()
            return this.defaultState
    }

    registerNewUser () {
        // votrApi.register(...)
        // saveUserInfo -> from authHelpers
    }

    loginUser () {
        // votrApi.login(...)
        // saveUserInfo -> from authHelpers
    }

    signOutUser () {
        clearUserInfo()
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
                                    loginUser={this.loginUser}
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
