//------------------------------------------------------
// Supabase Setup
//------------------------------------------------------
const supabaseUrl = "https://xzatttpouvlhqzbuwgmc.supabase.co";
const supabaseAnonKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YXR0dHBvdXZsaHF6YnV3Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MDIyMDQsImV4cCI6MjA3OTk3ODIwNH0.b_21iJwV6QrZ87xEVCxZxhwYGqvhBHMbm-W9Chu9RnE";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);


//------------------------------------------------------
// Load Profile Photo
//------------------------------------------------------
document.getElementById("profile-photo").src =
`${supabaseUrl}/storage/v1/object/public/photos/profile.jpg`;


//------------------------------------------------------
// Load Resume Download Button
//------------------------------------------------------
document.getElementById("resume-btn").href =
`${supabaseUrl}/storage/v1/object/public/photos/resume.pdf`;


//------------------------------------------------------
// Load Gallery Images from Supabase
//------------------------------------------------------
async function loadGallery() {
    try {
        const { data, error } = await supabaseClient.storage
            .from("photos")
            .list("", { limit: 100 });

        if (error) {
            console.error("Gallery Load Error:", error);
            return;
        }

        const galleryDiv = document.getElementById("gallery");
        galleryDiv.innerHTML = "";

        data.forEach(file => {

            // Ignore profile.jpg and resume.pdf
            if (file.name === "profile.jpg" || file.name === "resume.pdf") return;

            const imgUrl = `${supabaseUrl}/storage/v1/object/public/photos/${file.name}`;

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = file.name;
            img.classList.add("gallery-image");

            galleryDiv.appendChild(img);
        });

    } catch (err) {
        console.error("Unexpected Error:", err);
    }
}

loadGallery();


//------------------------------------------------------
// Lightbox Image Viewer
//------------------------------------------------------
document.addEventListener("click", e => {
    if (e.target.classList.contains("gallery-image")) {
        document.getElementById("lightbox-img").src = e.target.src;
        document.getElementById("lightbox").style.display = "flex";
    }

    if (e.target.id === "lightbox") {
        document.getElementById("lightbox").style.display = "none";
    }
});


//------------------------------------------------------
// Dark Mode Toggle
//------------------------------------------------------
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
