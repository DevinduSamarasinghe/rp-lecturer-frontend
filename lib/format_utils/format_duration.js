export const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60); // Remove decimals for seconds

    // If the duration includes hours, show only hours and minutes
    if (hours > 0) {
        return `${hours} hr ${minutes} min`;
    } 
    // If the duration includes minutes, show minutes and seconds
    else if (minutes > 0) {
        return `${minutes} min ${seconds} sec`;
    } 
    // If the duration is less than a minute, show only seconds
    else {
        return `${seconds} sec`;
    }
};
