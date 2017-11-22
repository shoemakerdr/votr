import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import NotLoggedIn from './NotLoggedIn'
import BackToLink from './BackToLink'
import votrApi from '../votrApi'
import { isLoggedIn } from '../authHelpers'
import styles from './styles/NewPoll.css'
import Loading from './Loading'

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
            shouldRedirect: false,
            isLoading: false,
        }
        this.state = this.defaultState
    }

    handleChange (event) {
        this.setState({title: event.target.value})
    }

    handleSubmit (event) {
        this.setState({isLoading: true})
        const params = {
            title: this.state.title,
            username: this.props.userInfo.username,
            options: this.state.options.map(opt => opt.trim()).filter(opt => opt !== '')
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
            }, () => this.lastItem.focus()) // focus on last item after adding option
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
        const { options } = this.state
        const dupeSet = new Set()
        options.forEach(option => {
            dupeSet.add(option.trim())
        })
        return options.filter(opt => opt !== '').length > 2 || dupeSet.size === options.length
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
        const { shouldRedirect, newPollId } = this.state
        return (
            <div>
                {shouldRedirect && <Redirect to={`/polls/${newPollId}`} />}
            </div>
        )
    }

    render () {
        const { title, options, isLoading } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                { isLoggedIn() ? <div className={styles.wrapper}>
                    <h1>Create A New Poll</h1>
                    <input
                        className='input'
                        placeholder='Title'
                        type='text'
                        value={title}
                        onChange={this.handleChange}
                    />
                    { this.state.options.map((option, i) => {
                        return (
                            <input
                                className='input'
                                placeholder='Option'
                                type='text'
                                key={i}
                                name={`${i}`}
                                value={options[i]}
                                onChange={this.changeOption}
                                ref={input => {
                                    if (i === this.state.options.length - 1)
                                        this.lastItem = input
                                }}
                            />
                        )
                    })}
                    <button
                        className={this.hasNoEmptyOptions() ? 'button' : 'disabled-button'}
                        disabled={!this.hasNoEmptyOptions()}
                        onClick={this.addOption}
                    >
                        Add Option
                    </button>
                    <input
                        className={this.canSubmitPoll() ? 'button' : 'disabled-button'}
                        type='submit'
                        disabled={!this.canSubmitPoll()}
                        value='Submit' />
                    </div>
                    : <NotLoggedIn />}
                {this.redirectToPoll()}
                { isLoggedIn() && <BackToLink to={`/users/${this.props.userInfo.username}`} message='To Your Dashboard' />}
                {isLoading && <Loading />}
            </form>
        )
    }
}

export default NewPoll

