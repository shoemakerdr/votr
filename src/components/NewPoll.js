import React, { Component } from 'react'

class NewPoll extends Component {
    constructor (props) {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addOption = this.addOption.bind(this)
        this.changeOption = this.changeOption.bind(this)
        this.hasNoEmptyOptions = this.hasNoEmptyOptions.bind(this)
        this.defaultState = {
            title: '',
            options: ['',''],
            canAddOption: false
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
    
    hasNoEmptyOptions () {
        const { options } = this.state
        for (let option of options) {
            if (option.length === 0)
                return false
        }
        return true
    }

    addOption (event) {
        event.preventDefault()
        if (this.noEmptyOptions()) {
            const newOptions = this.state.options.map(x => x)
            newOptions.push('')
            this.setState({
                canAddOption: this.hasNoEmptyOptions(),
                options: newOptions
            })
        }
    }

    changeOption (event) {
        const index = event.target.name
        const newOptions = this.state.options.map((x,i) => String(i) === index ? event.target.value : x)
        this.setState({
            canAddOption: this.hasNoEmptyOptions(),
            options: newOptions
        })
    }

    render () {
        return (
            <form className='NewPoll' onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Options:
                    { this.state.options.map((option, i) => {
                        return (
                            <input 
                                type="text"
                                key={i}
                                name={`${i}`}
                                value={this.state.options[i]}
                                onChange={this.changeOption} 
                            />
                        )
                    })}
                    <button
                        type='button'
                        disabled={this.state.canAddOption}
                        onClick={this.addOption}
                    >
                        Add option
                    </button>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default NewPoll

