import React, { Component } from 'react'
import './styles/Register.css'

class Register extends Component {
    constructor (props) {
        super()
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.canRegister = this.canRegister.bind(this)
        this.defaultState = {
            usernameInput: '',
            passwordInput: '',
            confirmPasswordInput: ''
        }
        this.state = this.defaultState
    }

    componentDidMount () {
        // this.props.logInUser()
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
        event.preventDefault()
        if (this.state.passwordInput !== this.state.confirmPasswordInput) {
            console.log('Passwords must match')
        }
        else console.log(this.state)
        this.setState(this.defaultState)
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
            </form>
        )
    }
}

export default Register
