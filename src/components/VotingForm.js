import React, { Component } from 'react'
import votrCheckmark from '../images/votr-checkmark.png'
import styles from './styles/VotingForm.css'

const votrCheckmarkStyle = {
    background: `url(${votrCheckmark}) 96% / 13% no-repeat #eee`,
}

class VotingForm extends Component {
    constructor (props) {
        super()
        this.changeSelect = this.changeSelect.bind(this)
        this.changeCustomOption = this.changeCustomOption.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.canSubmitVote = this.canSubmitVote.bind(this)
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

    isNoDuplicateOption (name) {
        const lower = name.toLowerCase().trim()
        return this.props.options.every(option => option.name.toLowerCase() !== lower)
    }

    getOption (name) {
        const lower = name.toLowerCase().trim()
        return this.props.options.find(option => option.name.toLowerCase() === lower)
    }

    handleSubmit (event) {
        let vote
        if (this.state.customOption) {
            if (this.isNoDuplicateOption(this.state.inputValue))
                vote = {option: this.state.inputValue.trim()}
            else vote = {optionId: this.getOption(this.state.inputValue).id}
        }
        else vote = {optionId: this.state.selectId}
        this.props.submitVote(vote)
        this.setState(this.defaultState)
        event.preventDefault()
    }

    canSubmitVote () {
        return !this.state.customOption || this.state.inputValue.trim() !== ''
    }

    render () {
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <select value={this.state.selectValue} onChange={this.changeSelect} style={votrCheckmarkStyle}>
                    {this.props.options.map(option => {
                        return (
                            <option key={option.id} id={option.id} value={option.name}>{option.name}</option>
                        )
                    })}
                    {this.props.userInfo.username && <option id={'customOption'} value={'Custom option...'}>Custom option...</option>}
                </select>
                {this.state.customOption &&
                    <label>
                        <input className={styles.custom} placeholder='Your custom option' type="text" value={this.state.inputValue} onChange={this.changeCustomOption} />
                    </label>}
                <input disabled={!this.canSubmitVote()} className={this.canSubmitVote() ? 'button' : 'disabled-button'} type="submit" value="Vote" />
            </form>
        )
    }
}

export default VotingForm

