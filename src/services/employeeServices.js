import { request } from "./apiClient.js";
/*
    & Employee Services    =>  Endpoints       => Method (Options)
    & 1. getEmployees      =>  /employees      => GET
    & 2. getEmployeeById   =>  /employees/id   => GET
    & 3. createEmployee    =>  /employees      => POST
    & 4. updateEmployee    =>  /employees/id   => PUT / PATCH
    & 5. deleteEmployee    =>  /employees/id   => DELETE
*/

export const getEmployees = async ()=> { 
    return request('/employees'); //? no need for options as the default is GET
}

export const getEmployeeById = async (id) => { 
    return request(`/employees/${id}`); //? GET is the DEFAULT
}

export const createEmployee = async (employee) => {
    return request('/employees', {
        method: 'POST',
        body: JSON.stringify(employee)
    });
}

export const updateEmployee = async (id, employee) => { 
    return request(`/employees/${id}`, {
        method: 'PUT',
        body: JSON.stringify(employee)
    });
}

export const deleteEmployee = async (id) => { 
    return request(`/employees/${id}`, {
        method: 'DELETE',
    });
}
