import React from 'react';
import { VscDebugBreakpointLog } from "react-icons/vsc";

const HistoryComponent = () => {
    return (
        <div>
            {/* Historical Data Analysis Box */}
            <div className="bg-white shadow-md rounded-lg p-6 mx-4 my-2">
                <h2 className="text-xl font-semibold mb-4">Historical Data Analysis</h2>
                <p className="text-gray-600">Coming soon</p>

                {/* Beta Version Box */}
                <div className="bg-blue-200 text-white shadow-lg rounded-lg p-4 my-2 relative w-64 h-auto"> {/* Beta Version Box */}
                    <div className="absolute top-2 left-2 bg-yellow-100 text-black text-sm px-3 py-1 rounded-lg shadow-md"> {/* Beta tag */}
                        Beta version
                    </div>
                    <p className="mt-8 text-sm text-black">
                        This is a beta test version of the user behavioral analytics board.<br />
                    </p>
                    <p className="mt-1 text-sm text-black">Created by RP24-16.</p>
                </div>

                {/* Upcoming Version Section (Outside the Beta Box) */}
                <div className="bg-gray-50 text-gray-700 shadow-sm rounded-lg p-4 my-4">
                    <h3 className="text-lg font-semibold mb-2">Upcoming Version Includes:</h3>
                    <ul className="space-y-2"> {/* Removed list-disc */}
                        <li className="flex items-center">
                            <VscDebugBreakpointLog className="mr-2" />
                            Positional insights based on lecture room objects.
                        </li>
                        <li className="flex items-center">
                            <VscDebugBreakpointLog className="mr-2" />
                            Enhanced action recognition.
                        </li>
                        <li className="flex items-center">
                            <VscDebugBreakpointLog className="mr-2" />
                            Updating metadata of sessions.
                        </li>
                        <li className="flex items-center">
                            <VscDebugBreakpointLog className="mr-2" />
                            More Analytical Information.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HistoryComponent;
