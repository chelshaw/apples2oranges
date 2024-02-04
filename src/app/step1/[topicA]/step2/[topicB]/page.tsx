"use server";

import { getTopic } from "@/adapter";
import UrlsLayout from "@/shared/urls-layout";
import Link from "next/link";

export default async function StepOneUrls({
    params,
}: {
    params: { topicA: string, topicB: string };
}) {
    const { name, id } = await getTopic(params.topicB);

    return (
        <>
            <div className="title">
                <Link href={`/step1/${params.topicA}/step2`}>Back</Link>
            </div>
            <UrlsLayout topicId={id} nextRoute={`/compare/${params.topicA}/${params.topicB}`} title={`Add URLs about ${name}`} />
        </>
    );
}
