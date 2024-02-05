"use server"

import { getTopics } from "@/adapter";
import CompareLayout from "@/shared/compare-layout";
import { NavBar } from "@/shared/navbar";

export default async function Compare({ params }: { params: { topicA: string, topicB: string } }) {
    const topics = await getTopics(params.topicA, params.topicB)
    return (
        <>
            <NavBar backLink={`/step1/${params.topicA}/step2/${params.topicB}`} />
            {!!topics && (
                <CompareLayout topicA={topics[0]} topicB={topics[1]} />
            )}
        </>
    );
}
