import {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from "../services/courseServices.js";

import { showMessage } from "../UI/message.js";
import { sortEntities } from "../utils/helpers.js";
import Course from "../Actors/Course.js";


export const loadCourses = async () => {
    try {
        const courseObjects = await getCourses();

        const courses = courseObjects.map(
            c => new Course(
                c.id,
                String(c.name),
                Number(c.code),
                String(c.description)
            )
        )

        return courses;

    } catch (err) {
        showMessage(err.message, "error", 2000);
        return [];
    }
};

export const addCourse = async (courseData) => {
    try {
        const { id, name, code, description } = courseData;

        const newCourse = await createCourse({ id, name, code, description });

        showMessage(`Course "${newCourse.name}" added successfully!`, "success", 3000);

        return new Course(
            newCourse.id,
            newCourse.name,
            newCourse.code,
            newCourse.description
        );

    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const editCourse = async (id, courseData) => {
    try {
        const updatedCourse = await updateCourse(id, courseData);

        showMessage("Course updated successfully!", "success", 3000);

        return new Course(
            updatedCourse.id,
            updatedCourse.name,
            updatedCourse.code,
            updatedCourse.description
        );

    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const removeCourse = async (id) => {
    try {
        await deleteCourse(id);
        showMessage("Course deleted successfully!", "success", 3000);
        return true;

    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const loadCourseById = async (id) => {
    try {
        const course = await getCourseById(id);

        return new Course(
            course.id,
            course.name,
            course.code,
            course.description
        );

    } catch (err) {
        showMessage(err.message, "error", 2000);
        return null;
    }
};

export const checkDuplicateId = async (id) => {
    const courses = await getCourses();
    return courses.some(c => c.id === id);
};

export const loadSortedCourses = async (column, order) => {
    if (!column) return [];

    const data = await sortEntities("courses", column, order);

    return data.map(
        c => new Course(c.id, c.name, c.code, c.description)
    );
};
