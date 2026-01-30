import { editStudent, removeStudent } from "../controllers/studentController.js";
import { showMessage } from "./message.js";
export  function renderTable (students)  {
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
        tr.querySelector(".delete-btn").addEventListener("click", async (e) => {
            if (!confirm(`Are you sure you want to delete ${student.name}?`))
                return;

            const btn = e.target.disabled = true;

            try {
                await removeStudent(student.id);
            } catch (err) {
                btn.disabled = false;
            }
        });


        //& Edit button
        tr.querySelector(".edit-btn").addEventListener("click", async () => {
            const newName = prompt("Enter new name:", student.name).trim();
            const newAge = Number(prompt("Enter new age:", student.age));
            if (!newName) { 
                showMessage("Name is required!", "error", 2500);
                return
            }

            if (!Number.isInteger(newAge)) { 
                showMessage("Age must be a valid number", "error", 2500);
                return
            }
            if (newAge <= 18) {
                showMessage("Age must be greater than 18", "error", 2500);
                    return;
            }
            
            try {
                    await editStudent(student.id, {
                        id: student.id,
                        name: newName,
                        age: newAge
                });
            } catch (err) {
                showMessage("Failed to update student","error", 2500);
                console.error(err);
            }

        });

        tbody.appendChild(tr);
});
}
