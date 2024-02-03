"use client"

import { useCallback } from "react";
import { addUrls } from "@/adapter";
import UrlsLayout from "@/shared/urls-layout";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StepOneUrls({ params }: { params: { topicA: string } }) {
    const router = useRouter();

    const handleNext = useCallback(async (url: string) => {
        await addUrls(params.topicA, url)
        router.push(`/step1/${params.topicA}/step2`)
    }, [params.topicA, router])

    return (
        <>
            <div className="title">
                <Link href="/step1">Back</Link>
            </div>
            <UrlsLayout onNext={handleNext} />
        </>
    );
}
