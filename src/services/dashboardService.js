import { request } from "../services/apiClient.js";

export const getDashboardData = async () => {

    const [students, instructors, employees] = await Promise.all([
        request("/students"),
        request("/instructors"),
        request("/employees")
    ]);

    return { students, instructors, employees };
};
