'use client'

import { askQuestion, ComparisonState, Conversation } from "@/actions";
import { Topic } from "@/adapter";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./styles.module.css";
import inputStyles from '../form/styles.module.css';

const initialState: ComparisonState = {
    topicA: [],
    topicB: [],
    message: 'ready for questions',
}

function Output({ topic, answers }: { topic: string, answers: Conversation[] }) {
    return (
        <div className={styles.contents}>
            {answers.length === 0 ? (
                <div className={styles.empty}>
                    I will answer your questions about {topic}
                </div>
            ) : (
                <div className={styles.answers}>
                    {answers.map(response => (
                        <div key={response.question}>
                            <p className={styles.question}>{response.question}</p>
                            <p>{response.answer}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function CompareLayout({ topicA, topicB }: { topicA: Topic, topicB: Topic }) {
    const [state, formAction] = useFormState(askQuestion, initialState);

    return (
        <>
            <Output topic={topicA.name} answers={state.topicA} />
            <Output topic={topicB.name} answers={state.topicB} />
            <div className="footer">
                <form action={formAction} className={inputStyles.inputBar}>
                    <input
                        type="text"
                        name="query"
                        className={inputStyles.input}
                    />
                    <input type="hidden" name="topicA" value={topicA.name} />
                    <input type="hidden" name="topicB" value={topicB.name} />
                    <SubmitButton />
                </form >
            </div>
            {state?.error && (
                <div className={styles.error}>
                    An error occurred: {state.error}
                </div>
            )}
        </>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <input disabled={pending} type="submit" value={pending ? "Loading" : "Ask"} className={inputStyles.button} />
    )
}