import Link from "next/link";
import styles from "./styles.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">🍎🍊</Link>
        </header>
    );
}
