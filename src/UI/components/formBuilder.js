export const formConfigs = {
    students: [
        { name: 'id', type: 'number', placeholder: 'ID', required: true, min: 1 },
        { name: 'name', type: 'text', placeholder: 'Name', required: true },
        { name: 'age', type: 'number', placeholder: 'Age', required: true, min: 19 }
    ],
    instructors: [
        { name: 'id', type: 'number', placeholder: 'ID', required: true, min: 1 },
        { name: 'name', type: 'text', placeholder: 'Name', required: true },
        { name: 'department', type: 'text', placeholder: 'Department', required: true },
        { name: 'salary', type: 'number', placeholder: 'Salary', required: true, min: 1 }
    ],
    employees: [
        { name: 'id', type: 'number', placeholder: 'ID', required: true, min: 1 },
        { name: 'name', type: 'text', placeholder: 'Name', required: true },
        { name: 'position', type: 'text', placeholder: 'Position', required: true },
        { name: 'office', type: 'text', placeholder: 'Office', required: true },
        { name: 'age', type: 'number', placeholder: 'Age', required: true, min: 18 },
        { name: 'startDate', type: 'date', placeholder: 'Start Date', required: true },
        { name: 'salary', type: 'number', placeholder: 'Salary', required: true, min: 1 }
    ]
};

export function renderForm(entityType, formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) {
        console.error("Form not found:", formSelector);
        return;
    }

    const config = formConfigs[entityType];
    if (!config) {
        console.error("No form config for:", entityType);
        return;
    }

    form.innerHTML = config.map(field => {
        let attributes = `
            type="${field.type}"
            name="${field.name}"
            placeholder="${field.placeholder}"
            ${field.required ? 'required' : ''}
            ${field.min !== undefined ? `min="${field.min}"` : ''}
            ${field.max !== undefined ? `max="${field.max}"` : ''}
        `;

        return `<input ${attributes} />`;
    }).join('') + `<button type="submit">Add ${entityType.slice(0, -1)}</button>`;
}
