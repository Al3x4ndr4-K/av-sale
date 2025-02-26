import { pluralize } from './pluralizeUtil.js';

export const formatStops = (stops) => {
  if (stops.length === 0) {
    return {
      stopsCount: 'Без пересадок',
      stopsCodes: '',
    };
  }

  const stopsCount = pluralize(stops.length, ['пересадка', 'пересадки', 'пересадок']);
  const stopsCodes = stops.join(', ');

  return {
    stopsCount,
    stopsCodes,
  };
};
