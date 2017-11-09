import PollList from './PollList'
import votrApi from '../votrApi'


class UserPollList extends PollList {
    constructor () {
        super()
        this.userId = this.props.match.params.user_id
        this.fetchPolls = this.fetchPolls.bind(this)
    }
    fetchPolls () {
        return votrApi.getAllPollsByUser(this.userId)
    }
}

export default UserPollList
