import { request } from "./apiClient.js";
/*
    & Student Services       =>  Endpoints       => Method (Options)
    & 1. getInstructors      =>  /instructors    => GET
    & 2. getInstructorById   =>  /instructors/id  => GET
    & 3. createInstructor    =>  /instructors    => POST
    & 4. updateInstructor    =>  /instructors/id  => PUT / PATCH
    & 5. deleteInstructor    =>  /instructors/id  => DELETE
*/

export const getInstructors = async ()=> { 
    return request('/instructors'); //? no need for options as the default is GET
}

export const getInstructorById = async (id) => { 
    return request(`/instructors/${id}`); //? GET is the DEFAUlT
}

export const createInstructor = async (instructor) => {
    return request('/instructors', {
        method: 'POST',
        body: JSON.stringify(instructor)
    });
}

export const updateInstructor = async (id, instructor) => { 
    return request(`/instructors/${id}`, {
        method: 'PUT',
        body: JSON.stringify(instructor)
    });
}

export const deleteInstructor = async (id, instructor) => { 
    return request(`/instructor/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(instructor)
    });
}
