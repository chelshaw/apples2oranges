"use client"

import { createTopic } from "@/adapter";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import NameLayout from "@/shared/name-layout";
import Link from "next/link";

export default function StepTwo({ params }: { params: { topicA: string } }) {
    const router = useRouter();

    const addName = useCallback(async (name: string) => {
        const { id } = await createTopic(name);
        router.push(`/step1/${params.topicA}/step2/${id}`)
    }, [router, params.topicA])

    return (
        <>
            <div className="title">
                <Link href={`/step1/${params.topicA}`}>Back</Link>
            </div>
            <NameLayout onNext={addName} title="Name your second topic" />
        </>
    );
}
