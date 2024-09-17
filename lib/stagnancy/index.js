export const calculateStagnancyAndMovement = (session) => {

    if (!session || !session.session_intervals) {
        console.error('Session or session_intervals is undefined');
        return {
            isStagnant: "None",
            mostFrequentPosition: [0, 0],
            mostFrequentDirection: 'None',
        };
    }

    const xPositions = session.session_intervals.map((interval) => interval.bbox[0]);
    const yPositions = session.session_intervals.map((interval) => interval.bbox[1]);

    // Calculate variance in x and y positions to assess stagnancy
    const variance = (values) => {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        return values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    };

    const xVariance = variance(xPositions);
    const yVariance = variance(yPositions);

    let isStagnant = xVariance < 50 && yVariance < 50; // Threshold for stagnancy, can be adjusted

    // Calculate the most common position (residence area)
    const positionFrequency = {};
    session.session_intervals.forEach((interval) => {
        const positionKey = `${interval.bbox[0]}-${interval.bbox[1]}`;
        positionFrequency[positionKey] = (positionFrequency[positionKey] || 0) + 1;
    });

    const mostFrequentPosition = Object.keys(positionFrequency).reduce((a, b) =>
        positionFrequency[a] > positionFrequency[b] ? a : b
    );

    // Calculate directional movement (left, right, up, down)
    let leftMovement = 0, rightMovement = 0, upMovement = 0, downMovement = 0;

    for (let i = 1; i < session.session_intervals.length; i++) {
        const prevInterval = session.session_intervals[i - 1];
        const currInterval = session.session_intervals[i];

        const deltaX = currInterval.bbox[0] - prevInterval.bbox[0];
        const deltaY = currInterval.bbox[1] - prevInterval.bbox[1];

        if (deltaX > 0) rightMovement++;
        if (deltaX < 0) leftMovement++;
        if (deltaY > 0) downMovement++;
        if (deltaY < 0) upMovement++;
    }

    const mostFrequentDirection = Math.max(leftMovement, rightMovement, upMovement, downMovement) === leftMovement
        ? 'Left'
        : rightMovement > leftMovement
            ? 'Right'
            : upMovement > downMovement
                ? 'Up'
                : 'Down';

    if (isStagnant){
        isStagnant = "Stagnant"
    } else {
        isStagnant = "Not Stagnant"
    }
    return {
        isStagnant,
        mostFrequentPosition: mostFrequentPosition.split('-').map(Number),
        mostFrequentDirection,
    };
};
