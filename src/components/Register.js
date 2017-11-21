import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './styles/Register.css'
import votrApi from '../votrApi'
import Loading from './Loading'

class Register extends Component {
    constructor (props) {
        super()
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.canRegister = this.canRegister.bind(this)
        this.flashError = this.flashError.bind(this)
        this.defaultState = {
            errorMessage: '',
            usernameInput: '',
            passwordInput: '',
            confirmPasswordInput: '',
            isLoading: false,
        }
        this.state = this.defaultState
    }

    flashError (err) {
        this.setState({errorMessage: err, isLoading: false})
        setTimeout(() => this.setState({errorMessage: ''}), 2000)
    }

    changeUsername (event) {
        this.setState({usernameInput: event.target.value})
    }

    changePassword (event) {
        this.setState({passwordInput: event.target.value})
    }

    changeConfirmPassword (event) {
        this.setState({confirmPasswordInput: event.target.value})
    }

    handleRegister (event) {
        const loginInfo = {
            username: this.state.usernameInput,
            password: this.state.passwordInput
        }
        event.preventDefault()
        if (this.state.passwordInput !== this.state.confirmPasswordInput) {
            return this.flashError('Passwords must match')
        }
        if (!this.state.passwordInput.match(/^.{8,}$/))
            return this.flashError('Password must be at least 8 characters')
        this.setState({isLoading: true})
        votrApi.register(loginInfo)
            .then(data => {
                if (data.error)
                    return this.flashError(data.error)
                this.props.loginToApp(data)
                this.setState({shouldRedirect: true})
            })
    }

    canRegister () {
        return this.state.usernameInput !== ''
            && this.state.passwordInput !== ''
            && this.state.confirmPasswordInput !== ''
    }

    render () {
        const {
            usernameInput,
            passwordInput,
            confirmPasswordInput,
            errorMessage,
            shouldRedirect,
            isLoading
        } = this.state
        return (
            <form className={styles.wrapper} onSubmit={this.handleRegister}>
                <h1>Sign up for Votr</h1>
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
                    className='input'
                    placeholder='Confirm Password'
                    type="password"
                    value={confirmPasswordInput}
                    onChange={this.changeConfirmPassword}
                />
                <input
                    className={this.canRegister() ? 'button' : 'disabled-button'}
                    type="submit"
                    disabled={!this.canRegister()}
                    value="Sign Up" />
                <div className='error'>{errorMessage}</div>
                {shouldRedirect && <Redirect to='/'/>}
                {isLoading && <Loading />}
            </form>
        )
    }
}

export default Register
