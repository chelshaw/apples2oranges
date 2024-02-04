"use client";

import { addUrl } from "@/actions";
import { useFormState } from "react-dom";
import inputStyles from '../form/styles.module.css'
import { useRouter } from "next/navigation";

export default function UrlsLayout({
    nextRoute,
    topicId,
    title = "Add URLs about your topic",
}: {
    nextRoute: string;
    topicId: number;
    title?: string;
}) {
    const router = useRouter();
    const [state, formAction] = useFormState(addUrl, null)

    if (state?.success) {
        router.push(nextRoute)
    } else {
        console.log('no state sucess')
    }

    return (
        <>
            <div className="content">{title}</div>
            <div className="footer">
                <form action={formAction} className={inputStyles.inputBar}>
                    <input
                        type="text"
                        name="url"
                        className={inputStyles.input}
                    />
                    <input type="hidden" name="topicId" value={topicId} />
                    <input type="submit" value="Next" className={inputStyles.button} />
                </form >
            </div>
        </>
    );
}
