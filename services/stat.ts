export const statService = {
  getStat: async () => {
    const response = await fetch('/api/stat', {
      method: 'POST',
      body: JSON.stringify({
        link: '',
      }),
    });

    return await response.json();
  },
};
