import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { shorterService } from '@/services/shorter';
import { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { Layout } from './layout';

export function ShortenForm() {
  const [shortUrl, setShortUrl] = useState<string>('');
  const [statUrl, setStatUrl] = useState<string>('');

  const shortenUrl = useCallback(async (url: string) => {
    const shorterResponse: any = await shorterService.short(url);
    if (shorterResponse && shorterResponse.generated) {
      setShortUrl(
        (window.location.origin + '/l/' + shorterResponse.generated) as string,
      );
      setStatUrl(
        (window.location.origin + '/s/' + shorterResponse.generated) as string,
      );
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      url: '',
    },
    onSubmit: (values) => shortenUrl(values.url),
  });

  const copyLink = useCallback((link: string) => {
    navigator.clipboard.writeText(link || '');
  }, []);

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex">
            <TextField
              fullWidth
              name="url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.url}
              error={!!formik.errors.url && formik.touched.url}
              helperText={formik.touched.url ? formik.errors.url : ''}
              variant="outlined"
            ></TextField>
            <Button sx={{ ml: 1 }} variant="outlined" type="submit">
              shorten!
            </Button>
          </Box>
        </form>
        <>
          {shortUrl && (
            <>
              <Box>
                <Typography variant="h6">Your shrtned link:</Typography>
                <Box display="flex" alignItems="center">
                  <Typography>{shortUrl}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => copyLink(shortUrl)}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography variant="h6">
                  You can access statistics or delete it here:
                </Typography>
                <Link href={statUrl}>
                  <Typography>{statUrl}</Typography>
                </Link>
              </Box>
            </>
          )}
        </>
      </Box>
    </Layout>
  );
}
