import { editStudent, removeStudent } from "../controllers/studentController.js";

export function renderTable(students) {
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = ""; 

    students.forEach(student => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;

        //& Delete button
        tr.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm(`Are you sure you want to delete ${student.name}?`)) {
            removeStudent(student.id); 
            }
        });

        //& Edit button
        tr.querySelector(".edit-btn").addEventListener("click", async () => {
            const newName = prompt("Enter new name:", student.name);
            const newAge = prompt("Enter new age:", student.age);

            if (newName && newAge && !isNaN(newAge)) {
                await editStudent(student.id, { name: newName, age: parseInt(newAge) });
            }
        });

        tbody.appendChild(tr);
});
}
