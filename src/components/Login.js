import React, { Component } from 'react'
// import './Login.css'

class Login extends Component {
    constructor (props) {
        super()
    }

    componentDidMount () {
        this.props.logInUser()
    }

    render () {
        return (
            <div className='Login'>
                You are now logged in!
            </div>
        )
    }
}

export default Login
