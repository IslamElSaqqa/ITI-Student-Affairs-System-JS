import { Pagination } from "./UI/components/pagination.js";
import { renderTable } from "./UI/tableRenderer.js";
import { renderForm } from "./UI/components/formBuilder.js";
import { showMessage } from "./UI/message.js";

// Import controllers
import * as studentController from "./controllers/studentController.js";
import * as instructorController from "./controllers/instructorController.js";
import * as employeeController from "./controllers/employeeController.js";

// Import table configs
import { studentTableConfig } from "./UI/tables/studentTableConfig.js";
import { instructorTableConfig } from "./UI/tables/instructorTableConfig.js";
import { employeeTableConfig } from "./UI/tables/employeeTableConfig.js";

// Import helpers
import { checkNameFormat, searchbyName } from "./utils/helpers.js";

export class AppState {
    constructor() {
        this.currentEntity = 'students';
        this.allData = [];
        this.filteredData = [];
        this.pagination = new Pagination([], 10);
        this.currentSort = { column: null, order: 'asc' };
        
        this.entityConfigs = {
            students: {
                controller: studentController,
                tableConfig: studentTableConfig,
                title: 'Student Management',
                validateAdd: this.validateStudent.bind(this)
            },
            instructors: {
                controller: instructorController,
                tableConfig: instructorTableConfig,
                title: 'Instructor Management',
                validateAdd: this.validateInstructor.bind(this)
            },
            employees: {
                controller: employeeController,
                tableConfig: employeeTableConfig,
                title: 'Employee Management',
                validateAdd: this.validateEmployee.bind(this)
            }
        };
    }

    async switchEntity(entityType) {
        this.currentEntity = entityType;
        this.currentSort = { column: null, order: 'asc' };
        
        // Update page title
        document.querySelector('#pageTitle').textContent = 
            this.entityConfigs[entityType].title;

        // Render form
        renderForm(entityType, '#entityForm');

        // Load data
        await this.loadData();
    }

    async loadData(sortColumn = null, sortOrder = 'asc') {
        const config = this.entityConfigs[this.currentEntity];
        
        try {
            if (sortColumn) {
                // Load sorted data
                this.allData = await config.controller[`loadSorted${capitalize(this.currentEntity)}`](sortColumn, sortOrder);
                this.currentSort = { column: sortColumn, order: sortOrder };
            } else {
                // Load all data
                this.allData = await config.controller[`load${capitalize(this.currentEntity)}`]();
            }
            
            this.filteredData = [...this.allData];
            this.pagination.setData(this.filteredData);
            this.render();
        } catch (error) {
            console.error("Error loading data:", error);
            showMessage("Failed to load data", "error", 2000);
        }
    }

    render() {
        const config = this.entityConfigs[this.currentEntity];
        const pageData = this.pagination.getCurrentPageData();
        
        renderTable(pageData, config.tableConfig, (column, order) => {
            this.handleSort(column, order);
        });
        
        this.pagination.renderPaginationButtons('#paginationButtons');
    }

    async handleSort(column, order) {
        await this.loadData(column, order);
    }

    search(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredData = [...this.allData];
        } else {
            this.filteredData = searchbyName(searchTerm, this.allData);
        }
        
        this.pagination.setData(this.filteredData);
        this.pagination.goToPage(1);
        this.render();
    }

    changeItemsPerPage(itemsPerPage) {
        this.pagination.setItemsPerPage(itemsPerPage);
        this.render();
    }

    async addEntity(formData) {
        const config = this.entityConfigs[this.currentEntity];
        
        // Validate
        const validation = config.validateAdd(formData);
        if (!validation.valid) {
            showMessage(validation.message, "error", 2500);
            return false;
        }

        // Check duplicate ID
        const checkDuplicate = config.controller.checkDuplicateId;
        if (await checkDuplicate(formData.id)) {
            showMessage("ID already exists", "error", 2500);
            return false;
        }

        // Add entity
        await config.controller[`add${capitalize(this.currentEntity.slice(0, -1))}`](formData);
        
        // Reload data
        await this.loadData(this.currentSort.column, this.currentSort.order);
        return true;
    }

    // Validation methods
    validateStudent(data) {
        if (!data.id || data.age <= 18 || !checkNameFormat(data.name)) {
            return { valid: false, message: "Invalid input. Name must be at least 8 characters with space, and age must be greater than 18." };
        }
        return { valid: true };
    }

    validateInstructor(data) {
        if (!data.id || !checkNameFormat(data.name) || !data.department.trim() || data.salary <= 0) {
            return { valid: false, message: "Invalid input. Please fill all fields correctly." };
        }
        return { valid: true };
    }

    validateEmployee(data) {
        if (!data.id || !checkNameFormat(data.name) || !data.position.trim() || 
            !data.office.trim() || data.age < 18 || !data.startDate || data.salary <= 0) {
            return { valid: false, message: "Invalid input. Please fill all fields correctly." };
        }
        return { valid: true };
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
