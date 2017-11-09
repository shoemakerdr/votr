
class VotrApi {
    constructor (host) {
        this.host = host
    }

    encodeParams (paramsObj) {
        return Object.keys(paramsObj).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObj[key])
          }).join('&')
    }

    getPoll (pollId) {
        return fetch(`${this.host}/polls/${pollId}`)
            .then(data => data.json())
    }

    newPoll (params) {
        // params object has title, userId, and options array
        params.options = params.options.join('\n')
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
        return fetch(`${this.host}/polls/${pollId}`, {method:'DELETE'})
            .then(data => data.json())
    }
}

export default new VotrApi('http://localhost:8000/api')
