"use server";

import { getTopic } from "@/adapter";
import { NavBar } from "@/shared/navbar";
import UrlsLayout from "@/shared/urls-layout";

export default async function StepOneUrls({
    params,
}: {
    params: { topicA: string, topicB: string };
}) {
    const { name, id } = await getTopic(params.topicB);

    return (
        <>
            <NavBar backLink={`/step1/${params.topicA}/step2`} />
            <UrlsLayout topicId={id} nextRoute={`/compare/${params.topicA}/${params.topicB}`} title={`Add URLs about ${name}`} />
        </>
    );
}
