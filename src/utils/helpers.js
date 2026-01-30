const nameRegex = /^(?=.{8,}$)[A-Za-z]+(?:\s[A-Za-z]+)+$/
export const checkNameFormat = (name) => nameRegex.test(name);
export function searchbyName(value, data) {
    return data.filter(d => d.name.toLowerCase().includes(value.toLowerCase()));
}