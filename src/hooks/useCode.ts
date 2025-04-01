import { myCodeAtom } from '@/atoms/codeStore';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const useCode = (watchword: string, player: string) => {
  const [code, setCode] = useAtom(myCodeAtom);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `${apiKey}sse/${watchword}/${player}/codeGet`;

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      // 受信データの最初と最後の `"` を削除
      let cleanedData = event.data.replace(/^"|"$/g, '');

      // `\\n`（エスケープされた改行）はそのまま維持
      cleanedData = cleanedData.replace(/\\n/g, '\\n');

      // `\n` を **本当の改行** に変換（Monaco Editor が正しく認識）
      cleanedData = cleanedData.replace(/\\n/g, '\n');

      // `\\t`（エスケープされたタブ）をタブに変換
      cleanedData = cleanedData.replace(/\\t/g, '    ');

      // `\r`（Windows の改行コード）を削除
      cleanedData = cleanedData.replace(/\r/g, '');

      // Monaco Editor に正しく表示させる
      setCode(cleanedData);
    };

    // コンポーネントがアンマウントされたときに接続を閉じる
    return () => {
      eventSource.close();
    };
  }, [url, setCode]);

  return { code: code };
};

export default useCode;
