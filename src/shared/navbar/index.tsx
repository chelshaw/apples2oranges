'use client'
import React from 'react';
import styles from "./styles.module.css";
import Link from 'next/link';

export function NavBar({ backLink }: { backLink: string }) {
    return (
        <div className="title">
            <div className={styles.bar}>
                <Link href={backLink}>Back</Link>
                <Link href="/">Restart</Link>
            </div>
        </div>
    )
}

