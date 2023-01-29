export const shorterService = {
  short: async (url: string) => {
    const response = await fetch('/api/short', {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
    });

    if (response.status !== 200) {
      return null;
    }

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

    if (response.status !== 200) {
      return null;
    }

    return await response.json();
  },
};
