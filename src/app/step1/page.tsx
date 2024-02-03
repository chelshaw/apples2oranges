"use client"

import { createTopic } from "@/adapter";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import NameLayout from "@/shared/name-layout";
import Link from "next/link";

export default function StepOne() {
    const router = useRouter();

    const addName = useCallback(async (name: string) => {
        const { id } = await createTopic(name);
        router.push(`/step1/${id}`)
    }, [router])

    return (
        <>
            <div className="title">
                <Link href="/step1">Back</Link>
            </div>
            <NameLayout onNext={addName} title="Name your first topic" />
        </>
    );
}
