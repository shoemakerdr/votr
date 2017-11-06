import React, { Component } from 'react'

class VotingForm extends Component {
    constructor (props) {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.defaultState = {
            selectValue: props.options[0].name,
            selectId: props.options[0].id,
            inputValue: '',
            customOption: false
        }
        this.state = this.defaultState
    }

    handleChange(event) {
        if (this.state.customOption) {
            this.setState({inputValue: event.target.value})
        }
        else {
            if (event.target.selectedOptions[0].id === 'customOption')
                this.setState({
                    selectValue: event.target.value,
                    customOption: true
                })
            else this.setState({
                selectValue: event.target.value,
                selectId: event.target.selectedOptions[0].id,
                customOption: false
            })
        }
    }
    
    handleSubmit(event) {
        let vote
        if (this.state.customOption)
            vote = {option: this.state.inputValue}
        else vote = {optionId: this.state.selectId}
        this.props.submitVote(vote)
        this.setState(this.defaultState)
        event.preventDefault()
    }

    render () {
        return (
            <form className='VotingForm' onSubmit={this.handleSubmit}>
                Vote:
                <select value={this.state.selectValue} onChange={this.handleChange}>
                    {this.props.options.map(option => {
                        return (
                            <option key={option.id} id={option.id} value={option.name}>{option.name}</option>
                        )
                    })}
                    <option id={'customOption'} value={'Custom option...'}>Custom option...</option>
                </select>
                {this.state.customOption && 
                    <label>
                        Custom option:
                        <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
                    </label>}
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default VotingForm

