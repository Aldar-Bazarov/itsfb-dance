import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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

const AreaChart = ({labels, trainingData, honorsData}) => {
    const areaChartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Тренировки',
                data: trainingData,
                borderColor: '#ED7BFF',
                backgroundColor: 'rgba(244, 183, 254, 0.3)',
            },
            {
                fill: true,
                label: 'Награды',
                data: honorsData,
                borderColor: '#5036B8',
                backgroundColor: 'rgba(80, 54, 184, 0.3)',
            },
        ],
    };

    return (
        <Line options={options} data={areaChartData} />
    )
}

export default AreaChart