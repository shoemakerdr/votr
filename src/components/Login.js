import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './styles/Login.css'
import votrApi from '../votrApi'

class Login extends Component {
    constructor (props) {
        super()
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.canLogin = this.canLogin.bind(this)
        this.flashError = this.flashError.bind(this)
        this.defaultState = {
            errorMessage: '',
            shouldRedirect: false,
            usernameInput: '',
            passwordInput: ''
        }
        this.state = this.defaultState
    }

    flashError (err) {
        this.setState({errorMessage: err})
        setTimeout(() => this.setState({errorMessage: ''}), 2000)
    }

    changeUsername (event) {
        this.setState({usernameInput: event.target.value})
    }

    changePassword (event) {
        this.setState({passwordInput: event.target.value})
    }

    handleLogin (event) {
        const loginInfo = {
            username: this.state.usernameInput,
            password: this.state.passwordInput
        }
        event.preventDefault()
        votrApi.login(loginInfo)
            .then(data => {
                if (data.error)
                    return this.flashError(data.error)
                this.props.loginToApp(data)
                this.setState({shouldRedirect: true})
            })
    }

    canLogin () {
        return this.state.usernameInput !== ''
            && this.state.passwordInput !== ''
    }

    render () {
        return (
            <form className={styles.wrapper} onSubmit={this.handleLogin}>
                <h1>Login</h1>
                <input
                    className='input'
                    placeholder='Username'
                    type="text"
                    value={this.state.usernameInput}
                    onChange={this.changeUsername}
                />
                <input
                    className='input'
                    placeholder='Password'
                    type="password"
                    value={this.state.passwordInput}
                    onChange={this.changePassword}
                />
                <input
                    className={this.canLogin() ? 'button' : 'disabled-button'}
                    type="submit"
                    disabled={!this.canLogin()}
                    value="Login" />
                {this.state.shouldRedirect && <Redirect to='/'/>}
                <div className='error'>{this.state.errorMessage}</div>
            </form>
        )
    }
}

export default Login
