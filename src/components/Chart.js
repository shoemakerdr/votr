import React from 'react'
import { Pie } from 'react-chartjs-2'
import { colorsFromDataLength } from '../utils'
import styles from './styles/Chart.css'

const Chart = props => {
    const labels = props.options.map(opt => opt.name)
    const data = props.options.map(opt => opt.votes)
    const options = {
        maintainAspectRatio: true,
        layout: {
            padding: {
                left: 10,
                right: 10,
            }
        },
        legend: {
            display: true,
            position: 'bottom',
            fullWidth: false,
            labels: {
                boxWidth: 12,
            }
        }
    }
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
        <div className={styles.wrapper}>
            <div>
                <Pie data={chartData} options={options}/>
            </div>
        </div>
    )
}

export default Chart
