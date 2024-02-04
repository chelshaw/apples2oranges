"use server";

import { getTopic } from "@/adapter";
import UrlsLayout from "@/shared/urls-layout";
import Link from "next/link";

export default async function StepOneUrls({
    params,
}: {
    params: { topicA: string };
}) {
    const { name, id } = await getTopic(params.topicA);

    return (
        <>
            <div className="title">
                <Link href="/step1">Back</Link>
            </div>
            <UrlsLayout topicId={id} nextRoute={`/step1/${params.topicA}/step2`} title={`Add URLs about ${name}`} />
        </>
    );
}
