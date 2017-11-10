import PollList from './PollList'
import votrApi from '../votrApi'


class UserPollList extends PollList {
    constructor (props) {
        super()
        this.userId = props.userInfo.userId
        this.fetchPolls = this.fetchPolls.bind(this)
    }
    fetchPolls () {
        return votrApi.getAllPollsByUser(this.userId)
    }
}

export default UserPollList
