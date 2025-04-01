//ルーム作成
export const createRoom = async ({
  setWatchword,
  setPlayer,
}: {
  setWatchword: (watchword: string) => void;
  setPlayer: (player: string) => void;
}) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `${apiKey}api/createWatchword`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('ネットワーク応答が正常ではありません');
    }

    const data = await response.json();

    setPlayer(data.id);
    setWatchword(data.watchword);
  } catch (error) {
    console.error('Error:', error);
  }
};
