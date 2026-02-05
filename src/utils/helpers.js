import { request } from "../services/apiClient.js";

export const sortEntities = async (actor, sortColumn, order = "asc") => {
    return request(`/${actor}?_sort=${sortColumn}&_order=${order}`);
};

const nameRegex = /^(?=.{8,}$)[A-Za-z]+(?:\s[A-Za-z]+)+$/
export const checkNameFormat = (name) => nameRegex.test(name);
export function searchbyName(value, data) {
    return data.filter(d => d.name.toLowerCase().includes(value.toLowerCase()));
}




