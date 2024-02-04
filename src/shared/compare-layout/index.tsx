'use client'

import { askQuestion, ComparisonState } from "@/actions";
import { Topic } from "@/adapter";
import { useFormState } from "react-dom";
import styles from "./styles.module.css";
import inputStyles from '../form/styles.module.css';

const initialState: ComparisonState = {
    topicA: [],
    topicB: [],
    message: 'ready for questions',
}
// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default function CompareLayout({ topicA, topicB }: { topicA: Topic, topicB: Topic }) {
    const [state, formAction] = useFormState(askQuestion, initialState);

    return (
        <>
            <div className={styles.contents}>
                {state.topicA.length === 0 ? (
                    <div className={styles.empty}>
                        I will answer your question about {topicA.name}
                    </div>
                ) : (
                    <div>
                        {state.topicA.map(response => (
                            <p key={response}>{response}</p>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.contents}>
                {state.topicB.length === 0 ? (
                    <div className={styles.empty}>
                        I will answer your question about {topicB.name}
                    </div>
                ) : (
                    <div>
                        {state.topicB.map(response => (
                            <p key={response}>{response}</p>
                        ))}
                    </div>
                )}
            </div>
            <div className="footer">
                <form action={formAction} className={inputStyles.inputBar}>
                    <input
                        type="text"
                        name="query"
                        className={inputStyles.input}
                    />
                    <input type="hidden" name="modelA" value={topicA.model} />
                    <input type="hidden" name="modelB" value={topicB.model} />
                    <input type="submit" value="Ask" className={inputStyles.button} />
                </form >
                <div>msg:{state?.message}</div>
            </div>
        </>
    );
}
