import React, { FormEvent, useCallback, useState } from 'react';
import styles from "./styles.module.css";

export function InputBar({ onSubmit, buttonText = 'Add' }: { onSubmit: CallableFunction, buttonText?: string }) {
    const [value, setValue] = useState('');

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>, val: string) => {
        event.preventDefault();
        if (!val) return;
        onSubmit(val);
        setValue('')
    }, [setValue, onSubmit]);

    return (
        <form onSubmit={(e) => handleSubmit(e, value)} className={styles.inputBar}>
            <input
                type="text"
                value={value}
                name="text"
                onChange={(e) => setValue(e.target.value)}
                className={styles.input}
            />
            <input type="submit" value="Add" className={styles.button} />
        </form >
    )
}

