"use server";

import { getTopic } from "@/adapter";
import { NavBar } from "@/shared/navbar";
import UrlsLayout from "@/shared/urls-layout";

export default async function StepOneUrls({
    params,
}: {
    params: { topicA: string };
}) {
    const { name, id } = await getTopic(params.topicA);

    return (
        <>
            <NavBar backLink="/step1" />
            <UrlsLayout topicId={id} nextRoute={`/step1/${params.topicA}/step2`} title={`Add URLs about ${name}`} />
        </>
    );
}
