import { addMinutes, format, intervalToDuration } from 'date-fns';

export const formatTime = (isoTimeString) => {
  if (!isoTimeString) {
    console.error('Некорректная дата:', isoTimeString);
    return '--:--';
  }
  return format(new Date(isoTimeString), 'HH:mm');
};

export const calculateArrivalTime = (departureTime, duration) => {
  if (!departureTime || typeof duration !== 'number') {
    console.error('Некорректные данные:', departureTime, duration);
    return '--:--';
  }
  const departureDate = new Date(departureTime);
  const arrivalDate = addMinutes(departureDate, duration);
  return format(arrivalDate, 'HH:mm');
};

export const formatDuration = (durationInMinutes) => {
  if (!durationInMinutes || typeof durationInMinutes !== 'number') {
    console.error('Некорректная длительность:', durationInMinutes);
    return '0ч 0м';
  }

  const duration = intervalToDuration({ start: 0, end: durationInMinutes * 60 * 1000 });
  return `${duration.hours || 0}ч ${duration.minutes || 0}м`;
};
