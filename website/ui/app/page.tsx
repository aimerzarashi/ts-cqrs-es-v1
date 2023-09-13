import Image from 'next/image';
import styles from './page.module.css';
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className='topMenu'>TOP MENU</div>
      <div>
        <Link href="/tests/auth/">Auth Tests</Link>
      </div>
    </main>
  )
}
