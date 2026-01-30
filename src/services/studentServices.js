import { request } from "./apiClient.js";
import { sortEntities } from "../utils/helpers.js";
/*
    & Student Services  =>  Endpoints     => Method (Options)
    & 1. GetStudents    =>  /students     => GET
    & 2. getStudentById =>  /students/id   => GET
    & 3. createStudent  =>  /students     => POST
    & 4. updateStudent  =>  /students/id   => PUT / PATCH
    & 5. deleteStudent  =>  /students/id   => DELETE
*/

export const getStudents = async ()=> { 
    return request('/students'); //? no need for options as the default is GET
}

export const getStudentById = async (id) => { 
    return request(`/students/${id}`); //? GET is the DEFAUlT
}

export const createStudent = async (student) => {
    return request('/students', {
        method: 'POST',
        body: JSON.stringify(student)
    });
}

export const updateStudent = async (id, student) => { 
    return request(`/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(student)
    });
}

export const deleteStudent = async (id) => { 
    return request(`/students/${id}`, {
        method: 'DELETE',
    });
}

//^ Custom sort student's column
export const sortStudents = (column, order) => {
    return sortEntities("students", column, order);
};

