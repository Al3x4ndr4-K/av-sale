export const fetchSearchId = async () => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await response.json();
    return data.searchId;
  } catch (error) {
    throw new Error('Не удалось получить searchId');
  }
};

export const fetchTickets = async (searchId) => {
  const maxRetries = 10;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
      const data = await response.json();
      return {
        tickets: data.tickets || [],
        stop: data.stop || false,
      };
    } catch (error) {
      attempts++;
      if (attempts === maxRetries) {
        throw new Error('Не удалось получить билеты');
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
