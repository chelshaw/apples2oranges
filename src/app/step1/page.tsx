"use client"

import { createTopic } from "@/adapter";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import NameLayout from "@/shared/name-layout";
import { NavBar } from "@/shared/navbar";

export default function StepOne() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const addName = useCallback(async (name: string) => {
        setLoading(true)
        const { id } = await createTopic(name);
        router.push(`/step1/${id}`)
    }, [router])

    return (
        <>
            <NavBar backLink="/" />
            <NameLayout onNext={addName} title="Name your first topic" loading={loading} />
        </>
    );
}
