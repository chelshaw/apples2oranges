"use server";

import OpenAI from "openai";

let oai: OpenAI;

const getOpenAi = () => {
  if (!oai) {
    oai = new OpenAI();
  }
  return oai;
};

export async function initializeModel(topic: string, content: string) {
  const openai = getOpenAi();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a helpful expert in a topic called "${topic}". The following are contents about this topic: ${content}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
  return completion.id;
}

export async function queryModel(
  modelId: string,
  query: string
): Promise<OpenAI.Chat.ChatCompletion.Choice> {
  const openai = getOpenAi();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    model: modelId,
  });
  console.log(completion.choices);
  return completion.choices[0];
}
