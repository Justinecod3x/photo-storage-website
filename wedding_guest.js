import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://zjgyunbxqonjxlnqwiqv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZ3l1bmJ4cW9uanhsbnF3aXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3NDEwOTMsImV4cCI6MjExMDMxNzA5M30.C-tr8rM1w-kSvWsEtLFL_GvxD7hFbCopsuFy1Aw5AqE";
const BUCKET = "wedding-photos";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const gallery = document.getElementById("gallery");
const photoCount = document.getElementById("photoCount");

async function loadGallery() {

    const { data, error } = await supabase.storage
        .from(BUCKET)
        .list("", {
            limit: 500,
            sortBy: { column: "created_at", order: "desc" }
        });

    if (error) {
        console.error("Unable to load photos:", error);
        photoCount.textContent = "Error";
        gallery.innerHTML = "<p>Unable to load photos right now. Please try again later.</p>";
        return;
    }

    const photos = data.filter(function (file) {
        return file.name !== ".emptyFolderPlaceholder";
    });

    photoCount.textContent =
        photos.length + (photos.length === 1 ? " Photo" : " Photos");

    if (photos.length === 0) {
        gallery.innerHTML = `
            <div class="no-photo">
                <div class="empty-icon">💍</div>
                <h3>No Photos Yet</h3>
                <p>Please check back soon!</p>
            </div>
        `;
        return;
    }

    gallery.innerHTML = "";

    photos.forEach(function (file, index) {

        const url = supabase.storage
            .from(BUCKET)
            .getPublicUrl(file.name).data.publicUrl;

        const card = document.createElement("div");
        card.className = "photo-card";

        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        const img = document.createElement("img");
        img.src = url;
        img.alt = "Wedding Photo " + (index + 1);
        imageContainer.appendChild(img);

        const saveLink = document.createElement("a");
        saveLink.className = "download-btn";
        saveLink.href = url;
        saveLink.target = "_blank";
        saveLink.rel = "noopener";
        saveLink.textContent = "⬇ Save Photo";

        card.appendChild(imageContainer);
        card.appendChild(saveLink);
        gallery.appendChild(card);

    });

}

loadGallery();