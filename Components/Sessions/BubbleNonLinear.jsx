import React, { useEffect } from 'react';
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

    // Convert normalized nose_coords (0 to 1) to pixel values
    const x = noseX * canvasWidth;
    const y = noseY * canvasHeight;

    // Normalize depthZ (range from -1 to 1) to bubble size (range 1 to 10)
    const bubbleSize = 1 + 1000 * (depthZ + 1) / 2; // Normalize to [1, 10] range

    return {
      x: x, // X position of the landmark
      y: bubbleSize, // Y position of the landmark
      r: 5, // Use the normalized bubble size
    };
  });
};

// Function to analyze data points and make deductions
const analyzeMovement = (bubbleData) => {
  const leftBoundary = canvasWidth / 3;
  const rightBoundary = (2 * canvasWidth) / 3;

  let leftCount = 0;
  let middleCount = 0;
  let rightCount = 0;

  // Count points in each section
  bubbleData.forEach((point) => {
    if (point.x < leftBoundary) {
      leftCount++;
    } else if (point.x >= leftBoundary && point.x < rightBoundary) {
      middleCount++;
    } else {
      rightCount++;
    }
  });

  // Determine the densest area
  const maxPoints = Math.max(leftCount, middleCount, rightCount);
  let densestArea = '';
  if (maxPoints === leftCount) densestArea = 'Left';
  if (maxPoints === middleCount) densestArea = 'Middle';
  if (maxPoints === rightCount) densestArea = 'Right';

  // Deduce movement
  const sectionsUsed = [leftCount > 0, middleCount > 0, rightCount > 0].filter(Boolean).length;

  let movementDeduction = '';
  if (sectionsUsed === 1) {
    movementDeduction = 'The person did not move much and stayed in one area.';
  } else if (sectionsUsed === 2) {
    movementDeduction = 'The lecturer used ample space to teach.';
  } else if (sectionsUsed === 3) {
    movementDeduction = 'The lecturer utilized the full space.';
  }

  return { densestArea, movementDeduction };
};

const BubbleNonLinear = ({ session }) => {
  // Extract dynamic bubble data from session intervals
  const bubbleData = getBubbleChartData(session);

  const setLecturePresenseSpread = useStore((state) => state.setLecturePresenceSpread);
  const setDensestArea = useStore((state) => state.setDensestArea);
  const setMovementDeduction = useStore((state) => state.setMovementDeduction);

  // Perform analysis based on the data
  const { densestArea, movementDeduction } = analyzeMovement(bubbleData);

  useEffect(() => {
    // Set the lecture presence spread based on the analysis
    setLecturePresenseSpread(`Densest Area: ${densestArea}, Movement Deduction: ${movementDeduction}`);
    setDensestArea(densestArea);
    setMovementDeduction(movementDeduction);
  }, [densestArea, movementDeduction, setLecturePresenseSpread]);

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
      {/* <p className="text-center mt-4 text-sm text-gray-700">
        {`Densest Area: ${densestArea}, Movement Deduction: ${movementDeduction}`}
      </p> */}
    </div>
  );
};

export default BubbleNonLinear;
