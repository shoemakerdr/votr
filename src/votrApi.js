import { getToken } from './authHelpers'

class VotrApi {
    constructor (host) {
        this.host = host
    }

    encodeParams (paramsObj) {
        return Object.keys(paramsObj).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObj[key])
          }).join('&')
    }

    login (params) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: this.encodeParams(params)
        }
        return fetch(`${this.host}/auth/login`, options)
            .then(data => {
                if (data.status === 401)
                    return {error: 'Incorrect username/password'}
                if (!data.ok)
                    return {error: 'There was an issue processing your login. Try again later.'}
                else return data.json()
            })
    }

    register (params) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: this.encodeParams(params)
        }
        return fetch(`${this.host}/auth/register`, options)
            .then(data => {
                if (!data.ok)
                    return {error: 'There was an issue processing your registration. Try again later.'}
                else return data.json()
            })
    }

    getAllPolls () {
        return fetch(`${this.host}/polls`)
            .then(data => data.json())
    }

    getAllPollsByUser (username) {
        return fetch(`${this.host}/users/${username}/polls`, {
            headers: {token: getToken()}})
            .then(data => {
                if (!data.ok)
                    return {error: 'Could not get user polls'}
                else return data.json()
            })
    }

    getPoll (pollId) {
        return fetch(`${this.host}/polls/${pollId}`)
            .then(data => data.json())
    }

    newPoll (params) {
        // params object has title, username, and options array
        params.options = params.options.filter(option => option !== '').join('\n')
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                token: getToken()
            },
            body: this.encodeParams(params)
        }
        return fetch(`${this.host}/polls`, options)
            .then(data => data.json())
    }

    submitVote (pollId, params) {
        // params object has either optionId or option-- CANNOT have both
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: this.encodeParams(params)
        }
        return fetch(`${this.host}/polls/${pollId}/vote`, options)
            .then(data => data.json())
    }

    deletePoll (pollId) {
        return fetch(`${this.host}/polls/${pollId}`, {
            method:'DELETE',
            headers: {token: getToken()}
        })
            .then(data => data.json())
    }
}

export default new VotrApi('http://localhost:8000/api')
