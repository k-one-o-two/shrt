import { useRouter } from 'next/router';
import { shorterService } from '@/services/shorter';
import { statService } from '@/services/stat';
import { useEffect, useCallback, useState } from 'react';
import { Layout } from '@/components/layout';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { DeleteDialog } from '@/components/deleteDialog';

function LinkStat() {
  const router = useRouter();
  const { random } = router.query;

  const [original, setOriginal] = useState<string>('');
  const [statistics, setStatistics] = useState<
    {
      clicks: number;
      random: string;
      utcDate: string;
      _id: string;
    }[]
  >([]);

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const getStoredLink = useCallback(async (random: string) => {
    const unshortResponse: any = await shorterService.unshort(random, true);

    if (unshortResponse.data && unshortResponse.data.original) {
      setOriginal(unshortResponse.data.original);
    }
  }, []);

  const getLinkStat = useCallback(async () => {
    const statResponse = await statService.getStat(random as string);
    if (statResponse.stat) {
      setStatistics(statResponse.stat);
    }
  }, [random]);

  useEffect(() => {
    if (!random) {
      return;
    }
    getStoredLink(random as string);
    getLinkStat();
  }, [random, getStoredLink, getLinkStat]);

  const deleteLink = useCallback(
    async (confirmed: boolean) => {
      console.info({ confirmed });
      setShowDeleteDialog(false);
      if (!confirmed) {
        return;
      }

      await statService.deleteLink(random as string);
      console.info('replace');
      router.replace('/');
    },
    [random, router],
  );

  return (
    <Layout>
      <Box>Statistics for: {random}</Box>
      <Grid container>
        <Grid item xs={4}>
          Original:
        </Grid>
        <Grid item xs={8}>
          {original}
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statistics?.map((statItem) => {
              return (
                <TableRow key={statItem._id}>
                  <TableCell>
                    {new Date(statItem.utcDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{statItem.clicks}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box pt={4}>
        <Button color="warning" onClick={() => setShowDeleteDialog(true)}>
          delete link
        </Button>
      </Box>
      <DeleteDialog open={showDeleteDialog} onSubmit={deleteLink} />
    </Layout>
  );
}

export default LinkStat;
