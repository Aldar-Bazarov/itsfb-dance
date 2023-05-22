import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
          display: true,
          text: 'График посещения тренировок и наград за батлы',
          font: {
            size: 20
          },
        },
    },
};

const LineChart = ({ labels, trainingData, honorsData }) => {
    const barChartData = {
        labels,
        datasets: [
            {
                label: 'Тренировки',
                data: trainingData,
                backgroundColor: '#f4b7fe',
            },
            {
                label: 'Награды',
                data: honorsData,
                backgroundColor: '#8169e2',
            },
        ],
    };

    return (
        <Bar options={options} data={barChartData} />
    )
}

export default LineChart