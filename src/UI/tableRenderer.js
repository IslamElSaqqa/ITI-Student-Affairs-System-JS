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

