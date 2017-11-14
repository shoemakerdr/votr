import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './styles/Register.css'
import votrApi from '../votrApi'

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
            confirmPasswordInput: ''
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
        return (
            <form className='Register' onSubmit={this.handleRegister}>
                <h1>Sign Up for Votr</h1>
                <input
                    className='Register--input'
                    placeholder='Username'
                    type="text"
                    value={this.state.usernameInput}
                    onChange={this.changeUsername}
                />
                <input
                    className='Register--input'
                    placeholder='Password'
                    type="password"
                    value={this.state.passwordInput}
                    onChange={this.changePassword}
                />
                <input
                    className='Register--input'
                    placeholder='Confirm Password'
                    type="password"
                    value={this.state.confirmPasswordInput}
                    onChange={this.changeConfirmPassword}
                />
                <input
                    className={this.canRegister() ? 'button' : 'disabled-button'}
                    type="submit"
                    disabled={!this.canRegister()}
                    value="Sign Up" />
                <div className='error'>{this.state.errorMessage}</div>
                {this.state.shouldRedirect && <Redirect to='/'/>}
            </form>
        )
    }
}

export default Register
