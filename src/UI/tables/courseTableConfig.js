import { editCourse, removeCourse } from "../../controllers/courseController.js";
import { showMessage } from "../message.js";

//^ Passing my custom configuration to courses
export const courseTableConfig = {
    tableSelector: "#entityTable",
    actor: "courses",
    columns: ["id", "name", "code", "description"],

    confirmDeleteMessage: (course) =>
        `Are you sure you want to delete course "${course.name}"?`,

    onDelete: (course) => removeCourse(course.id),

    onEdit: (course, updatedData) =>
        editCourse(course.id, updatedData),

    editPrompt: (course) => {

        //& Course Name
        const name = prompt("Enter new course name:", course.name);
        if (!name || !name.trim()) {
            showMessage("Course name is required", "error", 2500);
            return null;
        }

        //& Course Code
        const code = +prompt("Enter new course code:", course.code);
        if (!code) {
            showMessage("Course code is required", "error", 2500);
            return null;
        }

        //& Course Description
        const description = prompt(
            "Enter new course description:",
            course.description
        );
        if (!description || !description.trim()) {
            showMessage("Course description is required", "error", 2500);
            return null;
        }

        return {
            id: course.id,
            name: name.trim(),
            code: code,
            description: description.trim()
        }
    }
};
