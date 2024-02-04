"use server";

import { createTopic, getTopic, updateTopic } from "./adapter";
import { initializeModel, queryModel } from "./openai";
import { scrapeContent } from "./scraper";

export interface ComparisonState {
  topicA: string[];
  topicB: string[];
  message: string;
}
export async function askQuestion(
  formState: ComparisonState,
  formData: FormData
): Promise<ComparisonState> {
  const query = formData.get("query") as string;
  const modelA = formData.get("modelA") as string;
  const modelB = formData.get("modelB") as string;
  if (!query || !modelA || !modelB) {
    throw new Error("Required fields are missing to ask a question");
  }
  console.log("Asking question", query, modelA, modelB);
  try {
    formState.message = "";
    const promises = [modelA, modelB].map((modelId) =>
      queryModel(modelId, query)
    );
    const responses = await Promise.all(promises);
    formState.topicA.push(responses[0].message.content || "You stumped me");
    formState.topicB.push(responses[1].message.content || "You stumped me");
  } catch (e) {
    let message = "unknown";
    if (e instanceof Error) message = e.message;
    formState.message = `Some error occurred: ${message}`;
  }

  return formState;
}

export async function addUrl(formState: any, formData: FormData): Promise<any> {
  const topicId = formData.get("topicId") as string;
  const url = formData.get("url") as string;
  if (!topicId || !url) {
    throw new Error("Required fields are missing to add a URL");
  }
  const { name } = await getTopic(topicId);
  const content = await scrapeContent(url);
  // Create OpenAI topic with prompt including content (limited for token usage)
  const modelId = await initializeModel(name, content.slice(0, 16000));
  await updateTopic(topicId, { model: modelId, urls: [url] });
  return { success: true };
}
