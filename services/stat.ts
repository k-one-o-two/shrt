// rename?
export const statService = {
  getStat: async (random: string) => {
    const response = await fetch('/api/stat', {
      method: 'POST',
      body: JSON.stringify({
        random,
      }),
    });

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  },

  deleteLink: async (random: string) => {
    const response = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify({
        random,
      }),
    });

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  },
};
