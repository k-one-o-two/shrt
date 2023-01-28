import { useRouter } from 'next/router';
import { shorterService } from '@/services/shorter';
import { useEffect, useCallback } from 'react';

function LinkRedirect() {
  const router = useRouter();
  const { link } = router.query;

  const getStoredLink = useCallback(
    async (random: string) => {
      const unshortResponse: any = await shorterService.unshort(random);

      if (unshortResponse.data && unshortResponse.data.original) {
        router.replace(unshortResponse.data.original);
      }
    },
    [router],
  );

  useEffect(() => {
    getStoredLink(link as string);
  }, [link, getStoredLink]);

  return <>You will be redirected soon</>;
}

export default LinkRedirect;
