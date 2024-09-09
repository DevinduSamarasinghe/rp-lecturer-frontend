import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';

// Register required components, including LinearScale
ChartJS.register(Tooltip, Legend, PointElement, LinearScale);

// Function to extract bubble chart data from session intervals
const getBubbleChartData = (session) => {
  return session.session_intervals.map((interval) => {
    const [x, y] = interval.bbox.slice(0, 2); // Use the first two values of the bbox (top-left corner)
    const trackingDuration = interval.tracking_duration || 1; // Use tracking_duration as the bubble size
    return {
      x: x, // X position (left of bbox)
      y: y, // Y position (top of bbox)
      r: trackingDuration * 2, // Adjust the bubble size with tracking_duration
    };
  });
};

const BubbleChart = ({ session }) => {
  // Extract dynamic bubble data from session intervals
  const bubbleData = getBubbleChartData(session);

  const data = {
    datasets: [
      {
        label: 'Face Tracking',
        data: bubbleData, // Use the dynamically generated bubble data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear', // Explicitly set the scale type
        title: {
          display: true,
          text: 'X-axis (Left of BBox)',
        },
      },
      y: {
        type: 'linear', // Explicitly set the scale type
        title: {
          display: true,
          text: 'Y-axis (Top of BBox)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="w-full md:w-2/3 mx-auto">
      <h3 className="text-xl font-bold text-center">Face Tracking Visualization</h3>
      <div style={{ height: '400px' }}>
        <Bubble data={data} options={options} />
      </div>
    </div>
  );
};

export default BubbleChart;
