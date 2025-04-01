'use client';
import { Editor, Monaco } from '@monaco-editor/react';
import { useState } from 'react';
import CustomTheme from '../../../styles/theme/codeEditorTheme.json';
import { IconButton } from '@/components/elements/IconButton';
import styles from './Code.module.scss';
import { questionCode } from '../../../questions/code/question1';
import { documentCode } from '../../../questions/documents/document1';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { myCodeAtom, outputTextAtom } from '@/atoms/codeStore';
import ReactMarkdown from 'react-markdown';
import { phaseStatusAtom } from '@/atoms/phaseStatusAtom';
import { getOutput } from '@/api/code/codeRun';

export const Code = () => {
  const phase = useAtomValue(phaseStatusAtom);
  const [isOpenDocument, setIsOpenDocument] = useState(false);
  const [code, setCode] = useAtom(myCodeAtom);
  const setoutputText = useSetAtom(outputTextAtom);
  const [isPending, setIsPending] = useState<boolean>(false); //codeを実行中かどうか
  let phaseTextLeft = '自分のコード';
  let phaseTextRight = '仕様書';
  if (phase === 'read') {
    phaseTextLeft = 'お題';
  } else if (phase === 'delete') {
    phaseTextLeft = '相手のコード';
  } else if (phase === 'answer') {
    phaseTextRight = '答え';
  }
  const handleChange = (value: string | undefined) => {
    if (value === undefined) return;
    setCode(value);
  };
  const handleOpenDocument = () => {
    setIsOpenDocument(!isOpenDocument);
  };
  const handleRunCode = async () => {
    setIsPending(true);
    const textList = await getOutput(code);
    setIsPending(false);
    if (textList !== null) {
      setoutputText(textList);
    }
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('CustomTheme', {
      base: 'vs',
      inherit: true,
      ...CustomTheme,
    });
  };
  return (
    <div className={styles.codeBoxAll}>
      <div
        className={styles.codeBox}
        style={{
          width: isOpenDocument ? '50%' : '100%',
        }}
      >
        <div className={styles.codeHeader}>
          <p className={styles.text}>{phaseTextLeft}</p>
          {isOpenDocument === true ? (
            <></>
          ) : (
            <div className={styles.buttons}>
              {phase === 'answer' ? (
                <div onClick={handleOpenDocument}>
                  <IconButton
                    url="https://api.iconify.design/heroicons:document-text.svg?color=%23ffffff"
                    color="gray"
                  />
                </div>
              ) : (
                <>
                  <div onClick={handleOpenDocument}>
                    <IconButton
                      url="https://api.iconify.design/heroicons:document-text.svg?color=%23ffffff"
                      color="gray"
                    />
                  </div>
                  <div onClick={handleRunCode}>
                    <IconButton
                      url="https://api.iconify.design/fe:play.svg?color=%23ffffff"
                      color="orange"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <Editor
          options={{
            fontFamily: 'Inter, Noto Sans JP',
            fontSize: 16,
            fontWeight: '600',
            readOnly: false, //読み込みの有無を切り替え
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
          }}
          height="384px"
          width="100%"
          defaultLanguage="c"
          onChange={handleChange}
          value={phase === 'read' ? questionCode : code}
          theme="CustomTheme"
          beforeMount={handleEditorDidMount}
        />
      </div>
      <div
        className={styles.codeBox}
        style={{
          display: isOpenDocument ? '' : 'none',
          width: isOpenDocument ? '48.5%' : '',
          border:
            phase === 'answer'
              ? '5px solid var(--color-green)'
              : '5px solid var(--color-gray)',
        }}
      >
        <div className={styles.codeHeader}>
          <p className={styles.text}>{phaseTextRight}</p>
          {phase === 'answer' ? (
            <div className={styles.buttons}>
              <div onClick={handleOpenDocument}>
                <IconButton
                  url="https://api.iconify.design/heroicons:document-text.svg?color=%23ffffff"
                  color="gray"
                />
              </div>
            </div>
          ) : (
            <div className={styles.buttons}>
              <div onClick={handleOpenDocument}>
                <IconButton
                  url="https://api.iconify.design/heroicons:document-text.svg?color=%23ffffff"
                  color="gray"
                />
              </div>
              <div onClick={handleRunCode}>
                <IconButton
                  url="https://api.iconify.design/fe:play.svg?color=%23ffffff"
                  color="orange"
                />
              </div>
            </div>
          )}
        </div>
        {phase === 'answer' ? (
          <Editor
            options={{
              fontFamily: 'Inter, Noto Sans JP',
              fontSize: 16,
              fontWeight: '600',
              readOnly: true, //読み込みの有無を切り替え
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
            }}
            height="90%"
            width="100%"
            defaultLanguage="c"
            onChange={handleChange}
            value={questionCode}
            theme="CustomTheme"
            beforeMount={handleEditorDidMount}
          />
        ) : (
          <div className={styles.documentBox}>
            <ReactMarkdown>{documentCode}</ReactMarkdown>
          </div>
        )}
      </div>
      {isPending ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            backgroundColor: 'white',
            transform: 'translate(-50%, -50%)',
            border: '3px solid var(--color-green)',
            padding: '30px',
            borderRadius: '30px',
            boxShadow: 'var(--shadow-normal)',
            color: 'Var(--color-dark-gray)',
          }}
        >
          <h1>コードを実行中です</h1>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
