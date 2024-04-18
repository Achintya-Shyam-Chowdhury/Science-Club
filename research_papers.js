document.addEventListener("DOMContentLoaded", function () {
    const tagList = document.getElementById("tag-list");
    const researchPapers = document.querySelectorAll("#research-papers li");

    // Get all unique tags
    const tags = [];
    researchPapers.forEach(paper => {
        const paperTags = paper.querySelectorAll(".tag");
        paperTags.forEach(tag => {
            if (!tags.includes(tag.textContent.trim())) {
                tags.push(tag.textContent.trim());
            }
        });
    });

    // Create checkboxes for each tag
    tags.forEach(tag => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = tag;
        checkbox.id = tag;
        checkbox.addEventListener("change", filterPapers);

        const label = document.createElement("label");
        label.htmlFor = tag;
        label.textContent = tag;

        const container = document.createElement("div");
        container.classList.add("checkbox-container");
        container.appendChild(checkbox);
        container.appendChild(label);

        tagList.appendChild(container);
    });

    // Function to filter papers based on selected tags
    function filterPapers() {
        const selectedTags = Array.from(tagList.querySelectorAll("input:checked")).map(checkbox => checkbox.value);

        researchPapers.forEach(paper => {
            const paperTags = paper.querySelectorAll(".tag");
            let isVisible = false;

            // If no tags are selected, display the paper
            if (selectedTags.length === 0) {
                isVisible = true;
            } else {
                paperTags.forEach(tag => {
                    if (selectedTags.includes(tag.textContent.trim())) {
                        isVisible = true;
                    }
                });
            }

            if (isVisible) {
                paper.style.display = "block";
            } else {
                paper.style.display = "none";
            }
        });
    }
});
