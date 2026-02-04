import { showMessage } from "./message.js";

export const renderTable = (data, config, onSort = null) => {
    const {
        columns,
        tableSelector,
        onEdit,
        onDelete,
        confirmDeleteMessage,
        editPrompt
    } = config;

    const table = document.querySelector(tableSelector);
    const tbody = document.querySelector(`${tableSelector} tbody`);
    const thead = document.querySelector(`${tableSelector} thead tr`);
    
    if (!tbody || !thead) {
        console.error("Table elements not found for", tableSelector);
        return;
    }

    // Render table headers with sort functionality
    thead.innerHTML = `
        ${columns.map(col => `<th class="sortable" data-column="${col}">${formatColumnName(col)}</th>`).join("")}
        <th>Actions</th>
    `;

    // Add click listeners for sorting
    if (onSort) {
        thead.querySelectorAll('th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const column = th.dataset.column;
                
                // Determine sort order
                let order = 'asc';
                if (th.classList.contains('sort-asc')) {
                    order = 'desc';
                } else if (th.classList.contains('sort-desc')) {
                    order = 'asc';
                }

                // Remove all sort classes
                thead.querySelectorAll('th').forEach(header => {
                    header.classList.remove('sort-asc', 'sort-desc');
                });

                // Add current sort class
                th.classList.add(order === 'asc' ? 'sort-asc' : 'sort-desc');

                // Call sort callback
                onSort(column, order);
            });
        });
    }

    // Render table body
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="${columns.length + 1}" style="text-align: center; padding: 2rem; color: #666;">
                    No data available
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            ${columns.map(col => `<td>${formatCellValue(item[col], col)}</td>`).join("")}
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
                    // Remove row with animation
                    tr.style.opacity = '0';
                    setTimeout(() => tr.remove(), 300);
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

function formatColumnName(column) {
    // Convert camelCase to Title Case
    return column
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

function formatCellValue(value, column) {
    if (value === null || value === undefined) return '-';
    
    // Format dates
    if (column.toLowerCase().includes('date')) {
        try {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString();
            }
        } catch (e) {
            return value;
        }
    }
    
    // Format currency for salary
    if (column.toLowerCase().includes('salary')) {
        return `$${Number(value).toLocaleString()}`;
    }
    
    return value;
}
