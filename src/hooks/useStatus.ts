import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAtom } from 'jotai';
import { phaseStatusAtom } from '@/atoms/phaseStatusAtom';

const useStatus = (watchword: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  // const url = `${apiKey}sse/${watchword}/statusGet`;
  const url = `${apiKey}sse/${watchword}/statusGet`;
  // const [status, setStatus] = useState<string>("status");
  const [status, setStatus] = useAtom(phaseStatusAtom);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      setStatus(event.data);
      if (event.data === 'read') redirect(`/${event.data}`);
      if (event.data === 'delete') redirect(`/${event.data}`);
      if (event.data === 'fix') redirect(`/${event.data}`);
      if (event.data === 'answer') redirect(`/${event.data}`);
    };

    // コンポーネントがアンマウントされたときに接続を閉じる
    return () => {
      eventSource.close();
    };
  }, [url]);

  return { status, setStatus };
};

export default useStatus;
