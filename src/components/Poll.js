import React, { Component } from 'react'
// import './Component.css'

class Poll extends Component {
    render () {
        return (
            <div className='Poll'>
                Poll #{this.props.match.params.poll_id}
            </div>
        )
    }
}

export default Poll
