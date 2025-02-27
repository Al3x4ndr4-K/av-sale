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
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    return await response.json();
  } catch (error) {
    throw new Error('Не удалось получить билеты');
  }
};
