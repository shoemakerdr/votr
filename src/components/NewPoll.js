import React, { Component } from 'react'

class NewPoll extends Component {
    constructor (props) {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addOption = this.addOption.bind(this)
        this.changeOption = this.changeOption.bind(this)
        this.defaultState = {
            title: '',
            options: ['','']
        }
        this.state = this.defaultState
    }

    handleChange (event) {
        this.setState({title: event.target.value})
    }

    handleSubmit (event) {
        console.log(this.state)
        this.setState(this.defaultState)
        event.preventDefault()
    }

    addOption (event) {
        event.preventDefault()
        const newOptions = this.state.options.map(x => x)
        newOptions.push('')
        this.setState(prevState => {
            return {
                options: newOptions
            }
        })
    }

    changeOption (event) {
        const index = event.target.name
        const newOptions = this.state.options.map((x,i) => String(i) === index ? event.target.value : x)
        this.setState({ options: newOptions })
    }

    render () {
        return (
            <form className='NewPoll' onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={this.state.title} onChange={this.handleChange} />
                </label>
                <label>
                    Options:
                    { this.state.options.map((option, i) => {
                        return (
                            <input type="text" key={i} name={`${i}`} value={this.state.options[i]} onChange={this.changeOption} />
                        )
                    })}
                    <button type='button' onClick={this.addOption}>Add option</button>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default NewPoll

