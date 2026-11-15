
import { supabase } from "./supabase.js";

async function testConnection() {
    const { data, error } =
        await supabase.storage.listBuckets();

    if (error) {
        console.error("Connection error:", error.message);
    } else {
        console.log("Supabase connected!");
        console.log("Buckets:", data);
    }
}

testConnection();
