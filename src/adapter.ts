"use server";

import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

let supabaseClient: SupabaseClient;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const getSupabase = (): SupabaseClient => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
};

export async function createTopic(name: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("topics")
    .insert({ name })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
}

export interface Topic {
  id: number;
  name: string;
  urls: string[];
  model: string;
}

export const getTopic = async (id: string): Promise<Topic> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("topics")
    .select()
    .eq("id", parseInt(id));
  if (error) {
    throw new Error(error.message);
  }
  console.log(data[0]);
  return data[0] as Topic;
};

export const getTopics = async (
  topicA: string,
  topicB: string
): Promise<Topic[]> => {
  revalidatePath("/compare");
  const promises = [topicA, topicB].map((t) => getTopic(t));
  const results = await Promise.all(promises);
  return results;
};

export async function updateTopic(topicId: string, updates: any) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("topics")
    .update(updates)
    .eq("id", parseInt(topicId));
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/compare");
  return;
}
