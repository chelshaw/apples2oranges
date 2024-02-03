import { SupabaseClient, createClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const getSupabase = (): SupabaseClient => {
    if (!supabaseClient) {
        supabaseClient = createClient(supabaseUrl, supabaseKey)
    }
    return supabaseClient
}

export async function createTopic(name: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('topics')
        .insert({ name })
        .select()
    if (error) {
        throw new Error(error.message);
    }
    return data[0];
}