const sendCode = (watchword: string, player: string, code: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `${apiKey}api/${watchword}/codeExchange`;
  //プレイヤーのjotaiからとる
  const sendData = { player: player, code: code };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  })
    //接続できたかの確認
    .then((response) => {
      if (!response.ok) {
        throw new Error('ネットワーク応答が正常ではありません');
      }
      return response.json();
    })
    //エラーであった場合
    .catch((error) => {
      console.error('Error:', error);
    });
};
export default sendCode;
