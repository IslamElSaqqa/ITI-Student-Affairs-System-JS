import { showMessage } from "./message.js";

export const renderTable = (data, config) => {
    const {
        columns,
        tableSelector,
        onEdit,
        onDelete,
        confirmDeleteMessage,
        editPrompt
    } = config;

    const tbody = document.querySelector(`${tableSelector} tbody`);
    if (!tbody) {
        console.error("tbody not found for", tableSelector);
        return;
    }

    tbody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            ${columns.map(col => `<td>${item[col]}</td>`).join("")}
            <td>
                ${onEdit ? `<button class="action-btn edit-btn">Edit</button>` : ""}
                ${onDelete ? `<button class="action-btn delete-btn">Delete</button>` : ""}
            </td>
        `;

        if (onDelete) {
            tr.querySelector(".delete-btn").addEventListener("click", async () => {
                if (!confirm(confirmDeleteMessage(item))) return;
                try {
                    await onDelete(item);
                } catch {
                    showMessage("Delete failed", "error", 2500);
                }
            });
        }

        if (onEdit) {
            tr.querySelector(".edit-btn").addEventListener("click", async () => {
                const updated = editPrompt(item);
                if (!updated) return;
                try {
                    await onEdit(item, updated);
                } catch {
                    showMessage("Update failed", "error", 2500);
                }
            });
        }

        tbody.appendChild(tr);
    });
};

// import { showMessage } from "../UI/message.js";

// let sortState = {
//     field: null,
//     order: "asc"
// };

// export const renderTable = (data, config) => {
//     const { tableSelector, columns, onSort, onEdit, onDelete, confirmDeleteMessage, editPrompt } = config;

//     const table = document.querySelector(tableSelector);
//     if (!table) {
//         console.error("Table not found for selector:", tableSelector);
//         return;
//     }

//     const thead = table.querySelector("thead");
//     const tbody = table.querySelector("tbody");

//     if (!thead || !tbody) {
//         console.error("Thead or tbody not found in table:", tableSelector);
//         return;
//     }

//     thead.innerHTML = `
//         <tr>
//             ${columns.map(col => `
//                 <th ${col.sortable ? `data-field="${col.field}" style="cursor:pointer"` : ""}>
//                     ${col.label} ${col.sortable ? "⇅" : ""}
//                 </th>
//             `).join("")}
//             <th>Actions</th>
//         </tr>
//     `;

//     if (onSort) {
//         thead.querySelectorAll("[data-field]").forEach(th => {
//             th.addEventListener("click", async () => {
//                 const field = th.dataset.field;

//                 // Toggle sort order
//                 if (sortState.field === field) {
//                     sortState.order = sortState.order === "asc" ? "desc" : "asc";
//                 } else {
//                     sortState.field = field;
//                     sortState.order = "asc";
//                 }

//                 // Fetch sorted data from API
//                 const sortedData = await onSort(field, sortState.order);

//                 // Re-render table body
//                 renderBody(sortedData, config, tbody);
//             });
//         });
//     }

    
//     renderBody(data, config, tbody);
// };


// const renderBody = (data, config, tbody) => {
//     const { columns, onEdit, onDelete, confirmDeleteMessage, editPrompt } = config;

//     tbody.innerHTML = "";

//     data.forEach(item => {
//         const tr = document.createElement("tr");

//         tr.innerHTML = `
//             ${columns.map(c => `<td>${item[c.field]}</td>`).join("")}
//             <td>
//                 ${onEdit ? `<button class="edit-btn">Edit</button>` : ""}
//                 ${onDelete ? `<button class="delete-btn">Delete</button>` : ""}
//             </td>
//         `;

//         // 🔹 Delete handler
//         if (onDelete) {
//             const deleteBtn = tr.querySelector(".delete-btn");
//             deleteBtn?.addEventListener("click", async () => {
//                 if (!confirmDeleteMessage) return;
//                 if (!confirm(confirmDeleteMessage(item))) return;

//                 try {
//                     await onDelete(item);
//                 } catch (err) {
//                     showMessage("Delete failed", "error", 2500);
//                     console.error(err);
//                 }
//             });
//         }

//         // 🔹 Edit handler
//         if (onEdit) {
//             const editBtn = tr.querySelector(".edit-btn");
//             editBtn?.addEventListener("click", async () => {
//                 if (!editPrompt) return;
//                 const updatedData = editPrompt(item);
//                 if (!updatedData) return;

//                 try {
//                     await onEdit(item, updatedData);
//                 } catch (err) {
//                     showMessage("Update failed", "error", 2500);
//                     console.error(err);
//                 }
//             });
//         }

//         tbody.appendChild(tr);
//     });
// };
