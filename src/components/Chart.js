import React from 'react'

// TODO: Add something to show 'No votes yet' instead of chart

const Chart = props =>
    <div className='Chart'>
        { props.options.length && props.options.map(option => {
            return (
                <p key={option.id}>{option.name}: {option.votes} votes</p>
            )
        })}
    </div>

export default Chart
