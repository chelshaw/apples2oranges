"use server"

import Link from "next/link";
import { getTopics } from "@/adapter";
import CompareLayout from "@/shared/compare-layout";

export default async function Compare({ params }: { params: { topicA: string, topicB: string } }) {
    const topics = await getTopics(params.topicA, params.topicB)
    console.log({ topics })
    return (
        <>
            <div className="title">
                <Link href={`/step1/${params.topicA}/step2/${params.topicB}`}>Back</Link>
            </div>
            {!!topics && (
                <CompareLayout topicA={topics[0]} topicB={topics[1]} />
            )}
        </>
    );
}
