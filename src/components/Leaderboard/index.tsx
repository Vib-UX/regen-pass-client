import React, { useState, useEffect, useRef } from 'react';
import useGlobalStorage from '../../store';

const Leaderboard = () => {
    const { name } = useGlobalStorage();
    const [isWheelOpen, setIsWheelOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [finalRotation, setFinalRotation] = useState(0);
    const wheelRef = useRef(null);

    // Sample data for top 10 players
    const players = [
        { rank: 1, username: 'EcoWarrior', points: 12450, badges: 8 },
        { rank: 2, username: 'GreenThumb', points: 11320, badges: 7 },
        { rank: 3, username: name, points: 10890, badges: 9 },
        { rank: 4, username: 'EarthDefender', points: 9750, badges: 6 },
        { rank: 5, username: 'ClimateHero', points: 8960, badges: 8 },
        { rank: 6, username: 'PlanetSaver', points: 8540, badges: 5 },
        { rank: 7, username: 'RegenRanger', points: 7980, badges: 7 },
        { rank: 8, username: 'EcoChampion', points: 7650, badges: 6 },
        { rank: 9, username: 'GreenInnovator', points: 7320, badges: 5 },
        { rank: 10, username: 'NatureGuardian', points: 6980, badges: 7 },
    ];

    // Spin wheel prizes
    const prizes = [
        '100 Points',
        '200 Points',
        '50 Points',
        '500 Points',
        'Mystery Badge',
        'Extra Task',
        '20% Bonus',
        'Try Again',
    ];

    // Function to handle opening the wheel modal
    const openWheel = () => {
        setIsWheelOpen(true);
        setShowResult(false);
        setRotation(0);
    };

    // Function to handle closing the wheel modal
    const closeWheel = () => {
        setIsWheelOpen(false);
        setIsSpinning(false);
        setShowResult(false);
    };

    // Function to spin the wheel
    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowResult(false);

        // Calculate a random rotation (ensuring it lands on "Try Again" section)
        // "Try Again" is at index 7, so we want to land at 7 * 45 degrees (315°) plus some offset
        // Adding 3600 degrees (10 full rotations) for dramatic effect
        const tryAgainSegmentCenter = 315;
        const randomOffset = Math.random() * 35 + 5; // Random offset within the segment (5-40 degrees)
        const totalRotation = 3600 + tryAgainSegmentCenter + randomOffset;

        setFinalRotation(totalRotation);

        // Animate the wheel
        let start: any = null;
        const duration = 5000; // 5 seconds

        const animate = (timestamp: any) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);

            // Easing function for natural deceleration
            const easeOut = (t: any) => 1 - Math.pow(1 - t, 3);
            const currentRotation =
                progress * totalRotation * easeOut(progress);

            setRotation(currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setIsSpinning(false);
                    setShowResult(true);
                }, 500);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
            {/* Lucky Wheel Banner */}
            <div className="mb-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg p-4 shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-xl">
                            Try Your Luck!
                        </h3>
                        <p className="text-white text-sm mt-1">
                            Spin the wheel daily for a chance to win points and
                            special badges
                        </p>
                    </div>
                    <button
                        onClick={openWheel}
                        className="px-4 relative z-10 cursor-pointer py-2 bg-white text-orange-600 rounded-md font-medium shadow-sm hover:bg-orange-50 transition-colors flex items-center"
                    >
                        <span>Spin Now</span>
                        <svg
                            className="ml-2 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Top Players
                </h2>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        This Week
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        This Month
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200">
                        All Time
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Rank
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Player
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Points
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Badges
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {players.map((player) => (
                            <tr
                                key={player.rank}
                                className={
                                    player.rank <= 3 ? 'bg-orange-50' : ''
                                }
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div
                                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                            player.rank === 1
                                                ? 'bg-yellow-400'
                                                : player.rank === 2
                                                ? 'bg-gray-300'
                                                : player.rank === 3
                                                ? 'bg-amber-600'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        <span
                                            className={`text-sm font-medium ${
                                                player.rank <= 3
                                                    ? 'text-gray-800'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {player.rank}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-orange-100 flex items-center justify-center">
                                            <span className="text-orange-800 font-medium">
                                                {player.username.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {player.username}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {player.rank === 1
                                                    ? 'Champion'
                                                    : player.rank <= 3
                                                    ? 'Top Contributor'
                                                    : 'Active Member'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 font-medium">
                                        {player.points.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        REGEN Points
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex -space-x-1">
                                            {[
                                                ...Array(
                                                    Math.min(3, player.badges)
                                                ),
                                            ].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-6 h-6 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center"
                                                >
                                                    <span className="text-white text-xs">
                                                        ★
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="ml-2 text-sm text-gray-500">
                                            {player.badges}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700">
                    View All Rankings
                </button>
                <div className="text-sm text-gray-500">Updated 2 hours ago</div>
            </div>

            {/* Spin Wheel Modal */}
            {isWheelOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mt-20">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                Spin to Win!
                            </h3>
                            <button
                                onClick={closeWheel}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="relative w-64 h-64 mx-auto">
                            {/* Wheel SVG */}
                            <svg
                                ref={wheelRef}
                                className="w-full h-full"
                                viewBox="0 0 100 100"
                                style={{
                                    transform: `rotate(${rotation}deg)`,
                                    transition: isSpinning
                                        ? 'none'
                                        : 'transform 0.3s ease-out',
                                }}
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="#f97316"
                                    stroke="#f97316"
                                    strokeWidth="2"
                                />
                                {prizes.map((_, index) => {
                                    const angle = index * 45 - 22.5;
                                    return (
                                        <path
                                            key={index}
                                            d={`M 50 50 L ${
                                                50 +
                                                45 *
                                                    Math.cos(
                                                        (angle * Math.PI) / 180
                                                    )
                                            } ${
                                                50 +
                                                45 *
                                                    Math.sin(
                                                        (angle * Math.PI) / 180
                                                    )
                                            } A 45 45 0 0 0 ${
                                                50 +
                                                45 *
                                                    Math.cos(
                                                        ((angle + 45) *
                                                            Math.PI) /
                                                            180
                                                    )
                                            } ${
                                                50 +
                                                45 *
                                                    Math.sin(
                                                        ((angle + 45) *
                                                            Math.PI) /
                                                            180
                                                    )
                                            } Z`}
                                            fill={
                                                index % 2 === 0
                                                    ? '#fcd34d'
                                                    : '#fdba74'
                                            }
                                            stroke="#ffffff"
                                            strokeWidth="0.5"
                                        />
                                    );
                                })}
                                {prizes.map((prize, index) => {
                                    const angle = index * 45;
                                    return (
                                        <text
                                            key={index}
                                            x="50"
                                            y="50"
                                            fontSize="4"
                                            fontWeight="bold"
                                            fill="#ffffff"
                                            textAnchor="middle"
                                            transform={`rotate(${angle}, 50, 50) translate(0, -30)`}
                                        >
                                            {prize}
                                        </text>
                                    );
                                })}
                                <circle cx="50" cy="50" r="5" fill="#ffffff" />
                                <circle cx="50" cy="50" r="3" fill="#f97316" />
                            </svg>

                            {/* Pointer */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-10">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <polygon
                                        points="10,0 0,20 20,20"
                                        fill="#475569"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Result Message */}
                        {showResult && (
                            <div className="mt-4 bg-gray-100 p-4 rounded-lg text-center">
                                <h4 className="font-bold text-lg text-gray-800">
                                    Try Again
                                </h4>
                                <p className="text-gray-600">
                                    Better luck next time!
                                </p>
                            </div>
                        )}

                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={spinWheel}
                                disabled={isSpinning}
                                className={`px-6 py-3 bg-orange-500 text-white rounded-full font-bold transition-colors shadow-md ${
                                    isSpinning
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-orange-600'
                                }`}
                            >
                                {isSpinning ? 'SPINNING...' : 'SPIN'}
                            </button>
                        </div>

                        <div className="mt-4 text-center text-sm text-gray-500">
                            You have {showResult ? '0' : '1'} spin
                            {showResult ? 's' : ''} left today. Spins reset at
                            midnight.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
