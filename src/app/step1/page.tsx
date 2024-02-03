'use client'

import { createTopic } from "@/adapter";
import styles from "./page.module.css";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function StepOne() {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        setName(event.currentTarget.value);
    }, [setName])

    const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (event) => {
        event.preventDefault();
        if (!name) return;
        const { id } = await createTopic(name);
        router.push(`/step1/${id}`)
    }, [name, router])

    return (
        <main className={styles.content}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="topic-name">Name your first topic:</label>
                <input id="topic-name" name="topic-name" value={name} onChange={handleChange} />
                <input type="submit" value="Next" />
            </form>
        </main>
    );
}
