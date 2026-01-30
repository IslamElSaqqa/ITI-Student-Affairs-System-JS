import { loadStudents, addStudent, checkDuplicateId } from "./controllers/studentController.js";
import { showMessage } from "./UI/message.js";
import { renderTable } from "./UI/tableRenderer.js";
import { studentTableConfig } from "./UI/tables/studentTableConfig.js";
import { checkNameFormat, searchbyName } from "./utils/helpers.js";

let students = [];

async function initialize() {
    students = await loadStudents();
    renderTable(students, studentTableConfig);
}

initialize();

// Search
document.querySelector("#searchInput").addEventListener("keyup", (e) => {
    renderTable(
        searchbyName(e.target.value, students),
        studentTableConfig
    );
});

// Add student
document.querySelector("#studentForm").addEventListener("submit", async e => {
    e.preventDefault();

    const id = Number(e.target.id.value);
    const name = e.target.name.value;
    const age = Number(e.target.age.value);

    if (!id || age <= 18 || !checkNameFormat(name)) {
        showMessage("Invalid input");
        return;
    }

    if (await checkDuplicateId(id)) {
        showMessage("Id duplicated");
        return;
    }

    await addStudent({
        id: String(id),
        name,
        age
    });
    students = await loadStudents();
    renderTable(students, studentTableConfig);
});


