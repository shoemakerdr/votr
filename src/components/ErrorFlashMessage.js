import React, { Component } from 'react'
import styles from './styles/ErrorFlashMessage.css'

class ErrorFlashMessage extends Component {
    constructor (props) {
        super(props)
        this.timeoutId = null
        this.state = {
            errorMessage: props.error
        }
    }
    
    componentWillReceiveProps (nextProps) {
        clearTimeout(this.timeoutId)
        this.setState({errorMessage: nextProps.error})
        this.timeoutId = setTimeout(() => this.setState({errorMessage: ''}), 2000)
    }

    render () {
        return (
            <div className={styles.error}>{this.state.errorMessage}</div>
        )
    }
}

export default ErrorFlashMessage

