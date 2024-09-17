"use client"

import React, { useEffect } from 'react';

import { Pie } from 'react-chartjs-2'; // For Pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import useStore from '@/context/useStore';
// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const calculatePresenceData = (session) => {
    const faceCounts = session.session_intervals.reduce((acc, interval) => {
      acc[interval.face_name] = (acc[interval.face_name] || 0) + 1;
      return acc;
    }, {});
    
    const totalIntervals = session.session_intervals.length;
    const lecturerPresence = (faceCounts['devindu'] || 0) / totalIntervals * 100;
  
    return { faceCounts, lecturerPresence };
  };
  
  // Pie chart for presence data (based on face_name)
  const PresencePieChart = ({ session }) => {
    const { faceCounts, lecturerPresence } = calculatePresenceData(session);
    const setFacialAccuracy = useStore((state) => state.setFacialRecognitionAccuracy);
    useEffect(()=>{
      setFacialAccuracy
      (lecturerPresence);
    },[])
  
    const data = {
      labels: Object.keys(faceCounts),
      datasets: [
        {
          data: Object.values(faceCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

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
      <div className='w-full md:w-1/2 mx-auto'>
        {/* <h3 className="text-xl font-bold">Lecture Presence</h3> */}
        <div className='max-w-xs mx-auto'>
            <Pie data={data} options={options}/>
        </div>
      </div>
    );
  };

export default PresencePieChart;
  