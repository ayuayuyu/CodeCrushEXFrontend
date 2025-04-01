'use client';
import { toMin } from '@/utils/toMin';
import styles from './Timer.module.scss';
import { usePhaseTimer } from '@/hooks/usePhaseTimer';
import { toSec } from '@/utils/toSec';
import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import SendStatus from '@/api/status/sendStatus';
import { playerAtom, watchWordAtom } from '@/atoms/matchingStore';
import { phaseStatusAtom } from '@/atoms/phaseStatusAtom';
import useStatus from '../../../hooks/useStatus';
import { myCodeAtom } from '@/atoms/codeStore';
import sendCode from '@/api/code/sendCode';
import useCode from '@/hooks/useCode';

export const Timer = () => {
  const watchWord = useAtomValue(watchWordAtom);
  const player = useAtomValue(playerAtom);
  const status = useAtomValue(phaseStatusAtom);
  const code = useAtomValue(myCodeAtom);
  const [color, setColor] = useState('green');
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const timeoutSec = useRef(120);
  const statusId = useRef(2);
  useCode(watchWord, player);

  const time = usePhaseTimer(timeoutSec.current, () => {
    // SendStatus(watchWord, player, statusId.current);
  });
  useStatus(watchWord);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!time.isFinish) return;
    if (status == 'read') {
      timeoutSec.current = 120;
      statusId.current = 2;
    } else if (status == 'delete') {
      timeoutSec.current = 180;
      statusId.current = 3;
      sendCode(watchWord, player, code);
    } else if (status == 'fix') {
      statusId.current = 4;
    } else if (status == 'answer') {
      statusId.current = 5;
    }

    SendStatus(watchWord, player, statusId.current);
  }, [time.isFinish]);

  useEffect(() => {
    if (time.remainingTime !== null) {
      const newMin = toMin(time.remainingTime);
      const newSec = toSec(time.remainingTime);
      setMin(newMin);
      setSec(newSec);

      if (newMin < 1 && newSec < 20) {
        setColor('red');
      } else if (newMin < 1) {
        setColor('yellow');
      } else {
        setColor('green');
      }
    }
  }, [time.remainingTime]);

  return status === 'answer' ? (
    <div className={`${styles.time} ${styles[color]}`}>終了</div>
  ) : (
    <div className={`${styles.time} ${styles[color]}`}>
      <span className={styles['time-span']}>残り時間</span>
      {`${min}:${sec < 10 ? '0' + sec : sec}`}
    </div>
  );
};
