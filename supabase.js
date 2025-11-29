// supabase.js
const SUPABASE_URL = "https://xzatttpouvlhqzbuwgmc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YXR0dHBvdXZsaHF6YnV3Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDIyMDQsImV4cCI6MjA3OTk3ODIwNH0.b_21iJwV6QrZ87xEVCxZxhwYGqvhBHMbm-W9Chu9RnE";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// LOGIN FUNCTION
async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) alert(error.message);
    return data;
}

// CREATE NEW USER (ADMIN)
async function createUser(email, password) {
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    });
    if (error) alert(error.message);
    else alert("User Created Successfully");
}

// ADD ACHIEVEMENT
async function addAchievement(text) {
    await supabase.from("achievements").insert([{ text }]);
    alert("Achievement Added");
}

// GET ACHIEVEMENTS
async function getAchievements() {
    const { data } = await supabase.from("achievements").select("*");
    return data;
}
