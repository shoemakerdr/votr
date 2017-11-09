import React from 'react'

const Chart = props =>
    <div className='Chart'>
        { props.options.length && props.options.map(option => {
            return (
                <p key={option.id}>{option.name}: {option.votes} votes</p>
            )
        })}
        { !props.options.length && 'No votes yet'}
    </div>

export default Chart
