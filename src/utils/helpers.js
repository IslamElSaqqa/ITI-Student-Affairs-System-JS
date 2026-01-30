const nameRegex = /^(?=.{8,}$)[A-Za-z]+(?:\s[A-Za-z]+)+$/

export const checkNameFormat = (name) => nameRegex.test(name);