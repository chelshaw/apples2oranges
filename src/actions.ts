"use server";

import { getTopic, updateTopic } from "./adapter";
import { initializeModel, queryModel } from "./openai";
import { scrapeContent } from "./scraper";

export interface Conversation {
  question: string;
  answer: string;
}
export interface ComparisonState {
  topicA: Conversation[];
  topicB: Conversation[];
  error?: string;
}
export async function askQuestion(
  formState: ComparisonState,
  formData: FormData
): Promise<ComparisonState> {
  const query = formData.get("query") as string;
  const topicA = formData.get("topicA") as string;
  const topicB = formData.get("topicB") as string;
  if (!query || !topicA || !topicB) {
    throw new Error("Required fields are missing to ask a question");
  }
  formState.error = "";
  const promises = [topicA, topicB].map((modelId) =>
    queryModel(modelId, query)
  );
  try {
    const responses = await Promise.all(promises);
    formState.topicA.push({
      question: query,
      answer: responses[0].message.content || "You stumped me",
    });
    formState.topicB.push({
      question: query,
      answer: responses[1].message.content || "You stumped me",
    });
  } catch (e) {
    let message = "unknown error occurred";
    if (e instanceof Error) message = e.message;
    formState.error = message;
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
  await initializeModel(name, content.slice(0, 16000));
  await updateTopic(topicId, { urls: [url] });
  return { success: true };
}
