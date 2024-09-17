"use client";

import React, { useState, useEffect } from "react";
import useStore from "@/context/useStore";
import { FaWalking, FaCouch, FaMapMarkerAlt, FaArrowRight, FaClock, FaChartBar, FaArrowsAlt } from "react-icons/fa"; // Import icons from react-icons

const whatsHigher = (activeTime, passiveTime) => {
  let activePercentage = activeTime / (activeTime + passiveTime);

  if (activePercentage > 0.8) {
    return "You had a very active session";
  } else if (activePercentage > 0.5) {
    return "You had a moderately active session";
  } else if (activePercentage > 0.3) {
    return "You had a moderately passive session";
  } else {
    return "You had a very passive session";
  }
};

const adjustData = (isStagnant, mostFrequentPosition, mostFrequentDirection) => {
  if (isStagnant) {
    return "Stagnant. Better if we move around a bit yeah? ";
  } else {
    return "everywhere! Keep moving!";
  }
};

const SessionSidebar = () => {
  const activeTime = useStore((state) => state.activeTime);
  const passiveTime = useStore((state) => state.passiveTime);
  const session = useStore((state) => state.sessionContext);
  const isStagnant = useStore((state) => state.isStagnant);
  const mostFrequentPosition = useStore((state) => state.mostFrequentPosition);
  const mostFrequentDirection = useStore((state) => state.mostFrequentDirection);
  const facialRecognitionAccuracy = useStore((state) => state.facialRecognitionAccuracy);
  const lecturePresenceSpread = useStore((state) => state.setFacialRecognitionAccuracy);

  const densestArea = useStore((state) => state.densestArea);
  const movementDeduction = useStore((state) => state.movementDeduction);

  const [activeInsight, setActiveInsight] = useState(null);

  useEffect(() => {
    const activeInsight = whatsHigher(activeTime, passiveTime);
    setActiveInsight(activeInsight);
  }, [activeTime, passiveTime, session]);

  return (
    <div className="flex flex-col gap-6 mx-4 pt-2">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600 flex items-center gap-2">
          <FaClock /> <strong>Session Insights</strong>
        </h2>

        {/* Facial Recognition Accuracy */}
        <div className="mb-4">
          <p className="text-lg font-medium flex items-center gap-2">
            <FaWalking className="text-green-500" />
            <strong>Facial Recognition Accuracy</strong>
          </p>
          <p className="text-2xl text-gray-800 font-bold ml-6">{facialRecognitionAccuracy?.toFixed(2)}%</p>
        </div>

        {/* Lecture Presence Spread */}
        <div className="mb-4">
          <p className="text-lg font-medium flex items-center gap-2">
            <FaChartBar className="text-blue-500" />
            <strong>Lecture Presence Spread</strong>
          </p>
          <p className="text-base text-gray-600 ml-6">{movementDeduction && movementDeduction}</p>
        </div>

        {/* Active vs Passive Insights */}
        <div className="mb-4">
          <p className="text-lg font-medium flex items-center gap-2">
            <FaArrowRight className="text-yellow-500" />
            <strong>Session Activity</strong>
          </p>
          <p className="text-base text-gray-700 ml-6">{activeInsight}</p>
        </div>

        {/* Stagnancy and Movement Insights */}
        <div className="mb-4">
          <p className="text-lg font-medium flex items-center gap-2">
            <FaWalking className="text-red-500" />
            <strong>Movement</strong>
          </p>
          <p className="text-base text-gray-600 ml-6">
            Based on the statistics, you are <span className="font-bold ">{isStagnant ? "Stagnant" : "Not Stagnant"}</span>.
          </p>
        </div>

        {/* Most Frequent Position */}
        <div className="mb-4">
          <p className="text-lg font-medium flex items-center gap-2">
            <FaMapMarkerAlt className="text-purple-500" />
            <strong>Most Frequent Area</strong>
          </p>
          <p className="text-base text-gray-700 ml-6">{densestArea}</p>
        </div>

        {/* Most Frequent Direction */}
        <div className="mb-4">
          <p className="text-lg font-medium flex items-center gap-2">
            <FaArrowsAlt className="text-indigo-500" />
            <strong>Frequently moving towards</strong>
          </p>
          <p className="text-base text-gray-700 ml-6">{mostFrequentDirection}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionSidebar;
