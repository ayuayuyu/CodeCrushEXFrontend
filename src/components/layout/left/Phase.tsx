import { PhaseIcon } from "@/components/elements/PhaseIcon";
import styles from "./Phase.module.scss";
//import { useAtom } from "jotai";

export const Phase = () => {
  // const [phaseState,] = useAtom(phaseStatusAtom);
  const phaseState: string = "answer";
  return (
    <div className={styles.phase}>
      <PhaseIcon
        phase={phaseState as "read" | "delete" | "fix" | "answer"}
        isOn={true}
      />

      <div>
        {phaseState === "read" ? "コードをしっかり読んで理解しよう！！" : ""}
        {phaseState === "delete" ? "相手のコードを消して妨害しよう！" : ""}
        {phaseState === "fix" ? "崩されたコードを元の形に修復しよう！！" : ""}
        {phaseState === "answer" ? "振り返りと答え合わせ！！" : ""}
      </div>
    </div>
  );
};
