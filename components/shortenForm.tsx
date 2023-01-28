import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { shorterService } from '@/services/shorter';
import { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

export function ShortenForm() {
  const [shortUrl, setShortUrl] = useState<string>('');
  //   const router
  const shortenUrl = useCallback(async (url: string) => {
    const shorterResponse: any = await shorterService.short(url);
    console.info({ shorterResponse });
    if (shorterResponse && shorterResponse.generated) {
      setShortUrl(
        (window.location.origin + '/l/' + shorterResponse.generated) as string,
      );
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      url: '',
    },
    onSubmit: (values) => shortenUrl(values.url),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex">
          <TextField
            name="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.url}
            error={!!formik.errors.url && formik.touched.url}
            helperText={formik.touched.url ? formik.errors.url : ''}
            variant="outlined"
          ></TextField>
          <Button type="submit">shorten it!</Button>
        </Box>
      </form>
      {shortUrl && (
        <Box>
          <Typography variant="h6">Your shortened link:</Typography>
          <Typography>{shortUrl}</Typography>
        </Box>
      )}
    </>
  );
}
