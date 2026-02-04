import { request } from "../services/apiClient.js";

export const sortEntities = async (actor, sortColumn, order = "asc") => {
    return request(`/${actor}?_sort=${sortColumn}&_order=${order}`);
};

const nameRegex = /^(?=.{8,}$)[A-Za-z]+(?:\s[A-Za-z]+)+$/
export const checkNameFormat = (name) => nameRegex.test(name);
export function searchbyName(value, data) {
    return data.filter(d => d.name.toLowerCase().includes(value.toLowerCase()));
}

export const calculateStudentStats = (students) => {

    const ages = students.map(s => s.age);

    return {
        total: students.length,
        avgAge: (ages.reduce((a,b)=>a+b,0) / ages.length).toFixed(1),
        youngest: Math.min(...ages),
        oldest: Math.max(...ages)
    };
};

export const getCounts = (data) => {

    return {
        studentCount: data.students.length,
        instructorCount: data.instructors.length,
        employeeCount: data.employees.length
    };
};
