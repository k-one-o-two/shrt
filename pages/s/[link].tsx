import { useRouter } from 'next/router';
import { shorterService } from '@/services/shorter';
import { statService } from '@/services/stat';
import { useEffect, useCallback, useState } from 'react';
import { Layout } from '@/components/layout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function LinkRedirect() {
  const router = useRouter();
  const { link } = router.query;

  const [original, setOriginal] = useState<string>('');

  const getStoredLink = useCallback(async (random: string) => {
    const unshortResponse: any = await shorterService.unshort(random, true);

    if (unshortResponse.data && unshortResponse.data.original) {
      setOriginal(unshortResponse.data.original);
    }
  }, []);

  const getLinkStat = useCallback(async () => {
    const stat = await statService.getStat();
    console.info({ stat });
  }, []);

  useEffect(() => {
    getStoredLink(link as string);
    getLinkStat();
  }, [link, getStoredLink, getLinkStat]);

  return (
    <Layout>
      <Box>Statistics for: {link}</Box>
      <Grid container>
        <Grid item xs={4}>
          Original:
        </Grid>
        <Grid item xs={8}>
          {original}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default LinkRedirect;
