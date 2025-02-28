import { getTotalDuration } from '../normalize/durationTotalUtil.js';
import { normalize } from '../normalize/normalaze.js';

export const sortByPrice = (tickets) => [...tickets].sort((a, b) => a.price - b.price);

export const sortByDuration = (tickets) => [...tickets].sort((a, b) => getTotalDuration(a) - getTotalDuration(b));

export const sortByOptimal = (tickets) => {
  const minPrice = Math.min(...tickets.map((t) => t.price));
  const maxPrice = Math.max(...tickets.map((t) => t.price));
  const minDuration = Math.min(...tickets.map(getTotalDuration));
  const maxDuration = Math.max(...tickets.map(getTotalDuration));

  return [...tickets].sort((a, b) => {
    const normalizedPriceA = normalize(a.price, minPrice, maxPrice);
    const normalizedPriceB = normalize(b.price, minPrice, maxPrice);
    const normalizedDurationA = normalize(getTotalDuration(a), minDuration, maxDuration);
    const normalizedDurationB = normalize(getTotalDuration(b), minDuration, maxDuration);

    return normalizedPriceA + normalizedDurationA - (normalizedPriceB + normalizedDurationB);
  });
};

export const sortStrategies = {
  cheapest: sortByPrice,
  fastest: sortByDuration,
  optimal: sortByOptimal,
};
