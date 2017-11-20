import React, { Component } from 'react'
import styles from './App.css'
import Nav from './components/Nav'
import SliderNav from './components/SliderNav'
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

class App extends Component {
    constructor () {
        super()
        this.loginToApp = this.loginToApp.bind(this)
        this.signOutUser = this.signOutUser.bind(this)
        this.checkUser = this.checkUser.bind(this)
        this.toggleSlideMenu = this.toggleSlideMenu.bind(this)
        this.defaultState = {
            userInfo: {
                isLoggedIn: isLoggedIn(),
                username: isLoggedIn() ? getUsername() : ''
            },
            slideMenuVisible: false
        }
        this.state = this.checkUser()
    }

    checkUser () {
        if (isLoggedIn())
            return this.defaultState
        else clearUserInfo()
            return this.defaultState
    }

    loginToApp (info) {
        saveUserInfo(info)
        this.setState({
            userInfo: {
                isLoggedIn: true,
                username: info.username
            }
        })
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

    toggleSlideMenu () {
        this.setState(prevState => {
            return {slideMenuVisible: !prevState.slideMenuVisible}
        })
    }

    render() {
        return (
            <div className={styles.app}>
                <Router basename='/votr'>
                    <div>
                        <Nav toggleSlideMenu={this.toggleSlideMenu} userInfo={this.state.userInfo} />
                        <SliderNav toggleSlideMenu={this.toggleSlideMenu} shown={this.state.slideMenuVisible} userInfo={this.state.userInfo} />
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
                                <Register
                                    {...props}
                                    loginToApp={this.loginToApp}
                                />
                            )} />
                            <Route path='/login' render={props => (
                                <Login
                                    {...props}
                                    loginToApp={this.loginToApp}
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
