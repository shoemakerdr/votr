import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './styles/Login.css'
import votrApi from '../votrApi'
import Loading from './Loading'
import ErrorFlashMessage from './ErrorFlashMessage'

class Login extends Component {
    constructor (props) {
        super()
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.canLogin = this.canLogin.bind(this)
        this.defaultState = {
            errorMessage: '',
            shouldRedirect: false,
            usernameInput: '',
            passwordInput: '',
            isLoading: false,
        }
        this.state = this.defaultState
    }

    changeUsername (event) {
        this.setState({usernameInput: event.target.value})
    }

    changePassword (event) {
        this.setState({passwordInput: event.target.value})
    }

    handleLogin (event) {
        this.setState({isLoading: true})
        const loginInfo = {
            username: this.state.usernameInput,
            password: this.state.passwordInput
        }
        event.preventDefault()
        votrApi.login(loginInfo)
            .then(data => {
                if (data.error)
                    return this.setState({errorMessage: data.error, isLoading: false})
                this.props.loginToApp(data)
                this.setState({shouldRedirect: true})
            })
    }

    canLogin () {
        return this.state.usernameInput !== ''
            && this.state.passwordInput !== ''
    }

    render () {
        const { usernameInput, passwordInput, shouldRedirect, errorMessage, isLoading} = this.state
        return (
            <form className={styles.wrapper} onSubmit={this.handleLogin}>
                <h1>Login</h1>
                <input
                    className='input'
                    placeholder='Username'
                    type="text"
                    value={usernameInput}
                    onChange={this.changeUsername}
                />
                <input
                    className='input'
                    placeholder='Password'
                    type="password"
                    value={passwordInput}
                    onChange={this.changePassword}
                />
                <input
                    className={this.canLogin() ? 'button' : 'disabled-button'}
                    type="submit"
                    disabled={!this.canLogin()}
                    value="Login" />
                {shouldRedirect && <Redirect to='/'/>}
                {errorMessage && <ErrorFlashMessage error={errorMessage}/>}
                {isLoading && <Loading />}
            </form>
        )
    }
}

export default Login
