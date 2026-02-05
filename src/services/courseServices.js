import { request } from "./apiClient.js";

/*
    & Course Services  =>  Endpoints      => Method
    & 1. getCourses    =>  /courses       => GET
    & 2. getCourseById =>  /courses/id    => GET
    & 3. createCourse  =>  /courses       => POST
    & 4. updateCourse  =>  /courses/id    => PUT
    & 5. deleteCourse  =>  /courses/id    => DELETE
*/

export const getCourses = async () => {
    return request('/courses');
};

export const getCourseById = async (id) => {
    return request(`/courses/${id}`);
};

export const createCourse = async (course) => {
    return request('/courses', {
        method: 'POST',
        body: JSON.stringify(course)
    });
};

export const updateCourse = async (id, course) => {
    return request(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(course)
    });
};

export const deleteCourse = async (id) => {
    return request(`/courses/${id}`, {
        method: 'DELETE'
    });
};
