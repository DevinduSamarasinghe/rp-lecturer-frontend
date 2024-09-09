

export const formatDuration = (durationInSeconds) =>{
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = (durationInSeconds % 60).toFixed(2);

    //if the duration is over 60 seconds, shpw in minutes and seconds
    if(minutes > 0){
        return `${minutes} min ${seconds} sec`;
    }else {
        return `${seconds} sec`;
    }
}