"use client"

import { createTopic } from "@/adapter";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import NameLayout from "@/shared/name-layout";
import { NavBar } from "@/shared/navbar";

export default function StepTwo({ params }: { params: { topicA: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const addName = useCallback(async (name: string) => {
        setLoading(true);
        const { id } = await createTopic(name);
        router.push(`/step1/${params.topicA}/step2/${id}`)
    }, [router, params.topicA])

    return (
        <>
            <NavBar backLink={`/step1/${params.topicA}`} />
            <NameLayout onNext={addName} title="Name your second topic" loading={loading} />
        </>
    );
}
