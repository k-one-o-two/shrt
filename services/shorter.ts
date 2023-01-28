export const shorterService = {
  short: async (url: string) => {
    const response = await fetch('/api/short', {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
    });

    return await response.json();
  },

  unshort: async (link: string, preventRecord?: boolean) => {
    const response = await fetch('/api/unshort', {
      method: 'POST',
      body: JSON.stringify({
        link,
        preventRecord,
      }),
    });

    return await response.json();
  },
};
