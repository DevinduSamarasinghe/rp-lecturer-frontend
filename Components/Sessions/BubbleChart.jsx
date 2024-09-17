import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
import useStore from '@/context/useStore';

// Register required components, including LinearScale
ChartJS.register(Tooltip, Legend, PointElement, LinearScale);

// Define canvas width and height globally
const canvasWidth = 200; // Width of the canvas
const canvasHeight = 400; // Height of the canvas

// Function to extract bubble chart data from session intervals
const getBubbleChartData = (session) => {
  return session.session_intervals.map((interval) => {
    const [noseX, noseY, depthZ] = interval.nose_coords?.slice(0, 3) || [0, 0, 0]; // Use the nose coordinates
    //const trackingDuration = interval.tracking_duration || 1; // Use tracking_duration as the bubble size

    // Convert normalized nose_coords (0 to 1) to pixel values
    const x = noseX * canvasWidth;
    const y = noseY * canvasHeight;

    // Normalize depthZ (range from -1 to 1) to bubble size (range 1 to 10)
    const bubbleSize = 1 + 1000 * (depthZ + 1) / 2; // Normalize to [1, 10] range

    console.log('Bubble Data:', { x, y, bubbleSize }); // Log for debugging
    return {
      x: x, // X position of the landmark
      y: bubbleSize, // Y position of the landmark
      r: 5, // Use the normalized bubble size
    };
  });
};


const BubbleChart = ({ session }) => {
  // Extract dynamic bubble data from session intervals
  const bubbleData = getBubbleChartData(session);

  const setLecturePresenseSpread = useStore((state) => state.setLecturePresenceSpread);

  console.log('Bubble Data:', bubbleData); // Log for debugging

  const data = {
    datasets: [
      {
        label: 'Lecture Movement on Intervals',
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
          text: 'X-axis (X axis of camera frame)',
        },
        min: 0,
        max: canvasWidth, // Set the max to the canvas width
      },
      y: {
        type: 'linear', // Explicitly set the scale type
        title: {
          display: true,
          text: "Y-axis (Depth of lecturer's position)",
        },
        min: 0,
        max: canvasHeight, // Set the max to the canvas height
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
    <div className="w-full mx-auto ms:w-2/3">
      <h3 className="text-lg font-bold">Lecturer Movement Visualization</h3>
      <div style={{ height: '500px' }}>
        <Bubble data={data} options={options} />
      </div>
    </div>
  );
};

export default BubbleChart;
