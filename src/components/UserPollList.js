import PollList from './PollList'
// import './UserPollList.css'

class UserPollList extends PollList {
    fetchPolls () {
        return fetch(`${this.props.api}/users/${this.props.match.params.user_id}/polls`)
            .then(data => data.json())
    }
}

export default UserPollList
