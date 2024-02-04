"use server";
import * as cheerio from "cheerio";

async function getContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    return response.text();
  } catch (e) {
    throw new Error(`Unable to parse contents for URL ${url}`, e.message);
  }
}

export async function scrapeContent(url: string): Promise<string> {
  const content = await getContent(url);
  try {
    const $ = cheerio.load(content);
    // TODO: This works for wikipedia -- how to make it generic?
    const data = $(".content p").text();
    return data;
  } catch (e) {
    throw new Error(`Unable to read content from ${url}`);
  }
}
