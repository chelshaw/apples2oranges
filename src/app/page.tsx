import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Apples vs Oranges</h1>
      <p>Upload URLs to your AI models, and then ask them both a question at the same time.</p>
      <Link href="/step1">Start</Link>
    </main>
  );
}
