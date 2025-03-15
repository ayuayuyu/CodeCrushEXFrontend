import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
// import { Timer } from "@/components/layout/left/Timer";

export default function Home() {
  return (
    <Link href="/matching">
      <div className={styles.main}>
        <Image src={`/logo.svg`} alt="logo" width={450} height={100} priority />
      </div>
    </Link>
  );
}
