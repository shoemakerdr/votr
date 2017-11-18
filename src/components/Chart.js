import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { colorsFromDataLength } from '../utils'
import './styles/Chart.css'

const Chart = props => {
    const labels = props.options.map(opt => opt.name)
    const data = props.options.map(opt => opt.votes)
    const colors = colorsFromDataLength(props.options.length)
    const chartData = {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    }
    return (
        <div className='Chart'>
            <div>
                <Doughnut data={chartData} />
            </div>
        </div>
    )
}

export default Chart
