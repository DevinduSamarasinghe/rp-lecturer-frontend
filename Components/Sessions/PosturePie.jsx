import React from 'react';
import { Pie } from 'react-chartjs-2'; // For Pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ACTIVE_POSTURES = ["Lecturing", "High Right", "Mid Right", "Left High", "Mid High"];
const PASSIVE_POSTURES = ["Normal"];

const calculatePostureData = (session) => {
  const postureCounts = session.session_intervals.reduce((acc, interval) => {
    acc[interval.posture] = (acc[interval.posture] || 0) + 1;
    return acc;
  }, {});

  const activeTime = Object.keys(postureCounts)
    .filter((posture) => ACTIVE_POSTURES.includes(posture))
    .reduce((acc, key) => acc + postureCounts[key], 0);

  const passiveTime = Object.keys(postureCounts)
    .filter((posture) => PASSIVE_POSTURES.includes(posture))
    .reduce((acc, key) => acc + postureCounts[key], 0);

  return {
    postureCounts,
    activeTime,
    passiveTime,
  };
};

const PosturePieChart = ({ session }) => {
  const { postureCounts, activeTime, passiveTime } = calculatePostureData(session);

  const data = {
    labels: Object.keys(postureCounts),
    datasets: [{
      data: Object.values(postureCounts),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
    }],
  };

  // Options for Chart.js to make it smaller and responsive
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1, // Adjust this value for chart size (1 for square, 2 for wide)
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Can be 'top', 'left', 'right', or 'bottom'
      },
    },
  };

  return (
    <div className="w-full md:w-1/2 mx-auto"> {/* Restrict the width for responsiveness */}
      <h3 className="text-xl font-bold text-center">Dominant Postures</h3>
      <div className="max-w-xs mx-auto"> {/* Max width for the chart container */}
        <Pie data={data} options={options} />
      </div>
      <ActivePassiveStat activeTime={activeTime} passiveTime={passiveTime} />
    </div>
  );
};

const ActivePassiveStat = ({ activeTime, passiveTime }) => {
  const totalTime = activeTime + passiveTime;
  const activePercentage = (activeTime / totalTime) * 100;
  const passivePercentage = (passiveTime / totalTime) * 100;

  return (
    <div className="mt-4">
      <h4 className="font-bold text-center">Active vs. Passive Time</h4>
      <p className="text-center"><strong>Active Time:</strong> {activePercentage.toFixed(2)}%</p>
      <p className="text-center"><strong>Passive Time:</strong> {passivePercentage.toFixed(2)}%</p>
    </div>
  );
};

export default PosturePieChart;
