import { Input } from '../elements/Input';
import { TextButton } from '../elements/TextButton';
import styles from '../../app/matching/page.module.scss';
import joinRooms from '../layout/JoinRoom.module.scss';
import { useState } from 'react';
import { searchWatchword } from '@/api/matching/roomJoin';
import useStatus from '@/hooks/useStatus';
import { useSetAtom } from 'jotai';
import { playerAtom, watchWordAtom } from '@/atoms/matchingStore';
import { joinRoom } from '@/api/matching/roomJoin';

export const JoinRoom = () => {
  const [watchwordToJoin, setWatchwordToJoin] = useState<string>('');
  const setWatchword = useSetAtom(watchWordAtom);
  const setPlayer = useSetAtom(playerAtom);
  //   const [phaseStatus] = useStatus(watchwordToJoin)
  //あいことばを変更するための関数
  const handleChange = (value: string) => {
    setWatchwordToJoin(value);
  };

  //参加ボタン押した時に発火する関数
  const handleClick = async () => {
    setWatchword(watchwordToJoin);
    //パスワードの確認してルームに参加
    const searchInfo = await searchWatchword(watchwordToJoin);
    if (searchInfo !== null) {
      setPlayer(searchInfo.player);
      const _connect = joinRoom(watchwordToJoin, searchInfo.player);
      console.log(_connect);
    }
  };

  useStatus(watchwordToJoin);

  return (
    <div className={`${styles.contentBox} ${joinRooms.joinBox}`}>
      <div className={joinRooms.watchwordBox}>
        <p>
          対戦相手とマッチングするための合言葉を入力してください。
          <br />
          同じ合言葉を入力したプレイヤー同士がマッチングします。
        </p>
        <Input
          placeholder="あいことばを入力"
          // iconUrl="/icon.png"
          onChange={handleChange}
        />
      </div>
      <TextButton color="green" onClick={handleClick}>
        参加
      </TextButton>
    </div>
  );
};
