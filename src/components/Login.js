import React, { Component } from 'react'
import './styles/Login.css'
import votrApi from '../votrApi'

class Login extends Component {
    constructor (props) {
        super()
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.canLogin = this.canLogin.bind(this)
        this.defaultState = {
            usernameInput: '',
            passwordInput: ''
        }
        this.state = this.defaultState
    }

    componentDidMount () {
        // this.props.loginUser()
    }

    changeUsername (event) {
        this.setState({usernameInput: event.target.value})
    }

    changePassword (event) {
        this.setState({passwordInput: event.target.value})
    }

    handleLogin (event) {
        event.preventDefault()
        console.log(this.state)
        this.setState(this.defaultState)
    }

    canLogin () {
        return this.state.usernameInput !== ''
            && this.state.passwordInput !== ''
    }

    render () {
        return (
            <form className='Login' onSubmit={this.handleLogin}>
                <h1>Login</h1>
                <input
                    className='Login--input'
                    placeholder='Username'
                    type="text"
                    value={this.state.usernameInput}
                    onChange={this.changeUsername}
                />
                <input
                    className='Login--input'
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
            </form>
        )
    }
}

export default Login
