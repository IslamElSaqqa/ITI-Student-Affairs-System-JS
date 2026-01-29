import { request } from "./apiClient.js";
/*
    & Student Services  =>  Endpoints     => Method (Options)
    & 1. GetStudents    =>  /students     => GET
    & 2. getStudentById =>  /student/id   => GET
    & 3. createStudent  =>  /students     => POST
    & 4. updateStudent  =>  /student/id   => PUT / PATCH
    & 5. deleteStudent  =>  /student/id   => DELETE
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
    return request(`/student/${id}`, {
        method: 'PUT',
        body: JSON.stringify(student)
    });
}

export const deleteStudent = async (id, student) => { 
    return request(`/student/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(student)
    });
}
