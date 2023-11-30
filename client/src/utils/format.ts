export const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
  };