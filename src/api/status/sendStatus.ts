const SendStatus = (watchword: string, player: string, status: number) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `${apiKey}api/${watchword}/status`;
  //プレイヤーのjotaiからとる
  const sendData = { player: player, status: status };

  fetch(url, {
    //リクエストを送るためmethodはPOST
    method: 'POST',
    //headersは"Content-Type": "application/json"おまじないみたいなもん
    headers: {
      'Content-Type': 'application/json',
    },
    //JSON形式で送る
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
export default SendStatus;
