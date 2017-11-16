import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import NotLoggedIn from './NotLoggedIn'
import votrApi from '../votrApi'
import { isLoggedIn } from '../authHelpers'
import './styles/NewPoll.css'

class NewPoll extends Component {
    constructor (props) {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addOption = this.addOption.bind(this)
        this.changeOption = this.changeOption.bind(this)
        this.hasNoEmptyOptions = this.hasNoEmptyOptions.bind(this)
        this.redirectToPoll = this.redirectToPoll.bind(this)
        this.titleNotEmpty = this.titleNotEmpty.bind(this)
        this.noDuplicateOptions = this.noDuplicateOptions.bind(this)
        this.canSubmitPoll = this.canSubmitPoll.bind(this)
        this.defaultState = {
            title: '',
            options: ['',''],
            shouldRedirect: false
        }
        this.state = this.defaultState
    }

    handleChange (event) {
        this.setState({title: event.target.value})
    }

    handleSubmit (event) {
        const params = {
            title: this.state.title,
            username: this.props.userInfo.username,
            options: this.state.options
        }
        votrApi.newPoll(params)
            .then(result => this.setState({
                shouldRedirect: true,
                newPollId: result.poll_id
            }))
        event.preventDefault()
    }

    hasNoEmptyOptions () {
        const { options } = this.state
        for (let option of options) {
            if (option === '')
                return false
        }
        return true
    }

    addOption (event) {
        event.preventDefault()
        if (this.hasNoEmptyOptions()) {
            const newOptions = this.state.options.map(x => x)
            newOptions.push('')
            this.setState({
                options: newOptions
            })
        }
    }

    changeOption (event) {
        const index = event.target.name
        const newOptions = this.state.options.map((x,i) => String(i) === index ? event.target.value : x)
        this.setState({
            options: newOptions
        })
    }

    titleNotEmpty () {
        return this.state.title !== ''
    }

    noDuplicateOptions () {
        return true
    }

    atLeastTwoOptions () {
        return this.state.options[0] !== ''
            && this.state.options[1] !== ''
    }

    canSubmitPoll () {
        return this.atLeastTwoOptions()
            && this.titleNotEmpty()
            && this.noDuplicateOptions()
    }

    redirectToPoll () {
        return (
            <div>
                {this.state.shouldRedirect && <Redirect to={`/polls/${this.state.newPollId}`} />}
            </div>
        )
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                { isLoggedIn() ? <div className='NewPoll'>
                    <h1>Create A New Poll</h1>
                    <input
                        className='NewPoll--input'
                        placeholder='Title'
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    { this.state.options.map((option, i) => {
                        return (
                            <input
                                className='NewPoll--input'
                                placeholder='Option'
                                type="text"
                                key={i}
                                name={`${i}`}
                                value={this.state.options[i]}
                                onChange={this.changeOption}
                            />
                        )
                    })}
                    <button
                        className={this.hasNoEmptyOptions() ? 'button' : 'disabled-button'}
                        type='button'
                        disabled={!this.hasNoEmptyOptions()}
                        onClick={this.addOption}
                    >
                        Add Option
                    </button>
                    <input
                        className={this.canSubmitPoll() ? 'button' : 'disabled-button'}
                        type="submit"
                        disabled={!this.canSubmitPoll()}
                        value="Submit" />
                    </div>
                    : <NotLoggedIn />}
                {this.redirectToPoll()}
            </form>
        )
    }
}

export default NewPoll

