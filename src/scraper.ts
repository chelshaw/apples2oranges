"use server";
import * as cheerio from "cheerio";

async function getContent(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

export async function scrapeContent(url: string): Promise<string> {
  const content = await getContent(url);
  const $ = cheerio.load(content);
  // TODO: This works for wikipedia -- how to make it generic?
  const data = $(".content p").text();
  return data;
}
