import React, { Component } from 'react'
import votrCheckmark from '../images/votr-checkmark.png'
import './styles/VotingForm.css'

const styles = {
    select: {
        background: `url(${votrCheckmark}) 96% / 13% no-repeat #eee`,
    }
}

class VotingForm extends Component {
    constructor (props) {
        super()
        this.changeSelect = this.changeSelect.bind(this)
        this.changeCustomOption = this.changeCustomOption.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.defaultState = {
            selectValue: props.options[0].name,
            selectId: props.options[0].id,
            inputValue: '',
            customOption: false
        }
        this.state = this.defaultState
    }

    changeCustomOption (event) {
        if (this.state.customOption)
            this.setState({inputValue: event.target.value})
    }

    changeSelect (event) {
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

    handleSubmit (event) {
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
                <select value={this.state.selectValue} onChange={this.changeSelect} style={styles.select}>
                    {this.props.options.map(option => {
                        return (
                            <option key={option.id} id={option.id} value={option.name}>{option.name}</option>
                        )
                    })}
                    {this.props.userInfo.username && <option id={'customOption'} value={'Custom option...'}>Custom option...</option>}
                </select>
                {this.state.customOption &&
                    <label>
                        <input className='VotingForm--custom-option-input' placeholder='Your custom option' type="text" value={this.state.inputValue} onChange={this.changeCustomOption} />
                    </label>}
                <input className='VotingForm--button' type="submit" value="Vote" />
            </form>
        )
    }
}

export default VotingForm

