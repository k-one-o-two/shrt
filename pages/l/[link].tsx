import { useRouter } from 'next/router';
import { shorterService } from '@/services/shorter';
import { useEffect, useCallback, useState } from 'react';

function LinkRedirect() {
  const router = useRouter();
  const { link } = router.query;

  const [linkErr, setLinkErr] = useState<boolean>(false);

  const getStoredLink = useCallback(
    async (random: string) => {
      const unshortResponse = await shorterService.unshort(random);

      if (!unshortResponse) {
        setLinkErr(true);
        return;
      }

      if (unshortResponse.data && unshortResponse.data.original) {
        router.replace(unshortResponse.data.original);
      }
    },
    [router],
  );

  useEffect(() => {
    if (!link) {
      return;
    }

    getStoredLink(link as string);
  }, [link, getStoredLink]);

  return (
    <>{linkErr ? 'This link does not exist' : 'You will be redirected soon'}</>
  );
}

export default LinkRedirect;
