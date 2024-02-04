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
        content: `The following are contents about a topic called "${topic}": ${content}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
  return completion.id;
}

export async function queryModel(
  topic: string,
  query: string
): Promise<OpenAI.Chat.ChatCompletion.Choice> {
  const openai = getOpenAi();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `The question asked by the user is in reference to the topic "${topic}"`,
      },
      {
        role: "user",
        content: query,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices);
  return completion.choices[0];
}
