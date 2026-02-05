import { AppState } from "./appState.js";

// Initialize app state
const app = new AppState();

// Setup pagination callback
app.pagination.setPageChangeCallback(() => {
    app.render();
});

// Initialize with students
async function initialize() {
    await app.switchEntity('students');
}

initialize();

// Navigation handling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Switch entity
        const entityType = link.dataset.entity;
        await app.switchEntity(entityType);
    });
});


// Search functionality
document.querySelector("#searchInput").addEventListener("keyup", (e) => {
    app.search(e.target.value);
});

// Entries per page
document.querySelector("#entriesSelect").addEventListener("change", (e) => {
    const itemsPerPage = Number(e.target.value);
    app.changeItemsPerPage(itemsPerPage);
});

// Form submission handling
document.querySelector("#entityForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {};
    const formElements = e.target.elements;

    // Collect form data
    for (let element of formElements) {
        if (element.name && element.type !== 'submit') {
            if (element.type === 'number') {
                formData[element.name] = Number(element.value);
            } else {
                formData[element.name] = element.value;
            }
        }
    }

    // Add entity
    const success = await app.addEntity(formData);
    
    if (success) {
        e.target.reset();
    }
});
