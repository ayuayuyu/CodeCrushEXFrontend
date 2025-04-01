'use client';
import { TextButton } from '../elements/TextButton';
import roomcreated from '../layout/RoomCreated.module.scss';
import matching from '../../app/matching/page.module.scss';
import { useAtomValue } from 'jotai';
import { playerAtom, watchWordAtom } from '@/atoms/matchingStore';
import { joinRoom } from '@/api/matching/roomJoin';
import { useEffect } from 'react';
import useStatus from '@/hooks/useStatus';
export const RoomCreated = () => {
  const watchWord = useAtomValue(watchWordAtom);
  const player = useAtomValue(playerAtom);
  useStatus(watchWord);
  //ルームに参加
  useEffect(() => {
    const fetchSearchInfo = async () => {
      const atai = await joinRoom(watchWord, player);
    };
    fetchSearchInfo();
  }, [watchWord, player]);

  //あいことばをコピー
  const copyWatchword = () => {
    navigator.clipboard.writeText(`${watchWord}`).then(
      () => {
        console.log('コピー成功');
      },
      () => {
        console.log('コピー失敗');
      },
    );
  };
  return (
    <div className={matching.contentBox}>
      <p className={roomcreated.text}>あいことば</p>
      <h2 className={roomcreated.watchword}>{watchWord}</h2>
      <TextButton color="gray" onClick={copyWatchword}>
        <div className={roomcreated.copytext}>
          <p>コピー</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <path
              stroke="var(--color-medium-gray)"
              fill="var(--color-medium-gray)"
              d="M19.53 8L14 2.47a.75.75 0 0 0-.53-.22H11A2.75 2.75 0 0 0 8.25 5v1.25H7A2.75 2.75 0 0 0 4.25 9v10A2.75 2.75 0 0 0 7 21.75h7A2.75 2.75 0 0 0 16.75 19v-1.25H17A2.75 2.75 0 0 0 19.75 15V8.5a.75.75 0 0 0-.22-.5m-5.28-3.19l2.94 2.94h-2.94Zm1 14.19A1.25 1.25 0 0 1 14 20.25H7A1.25 1.25 0 0 1 5.75 19V9A1.25 1.25 0 0 1 7 7.75h1.25V15A2.75 2.75 0 0 0 11 17.75h4.25ZM17 16.25h-6A1.25 1.25 0 0 1 9.75 15V5A1.25 1.25 0 0 1 11 3.75h1.75V8.5a.76.76 0 0 0 .75.75h4.75V15A1.25 1.25 0 0 1 17 16.25"
            />
          </svg>
        </div>
      </TextButton>
    </div>
  );
};
