import { getDashboardData } from "../services/dashboardService.js";
import { getCounts } from "../utils/helpers.js";
import { renderStudentAgeChart } from "../UI/components/dashboardCharts.js";
import { renderDepartmentPieChart } from "../UI/components/dashboardCharts.js";

const loadDashboard = async () => {

    const data = await getDashboardData();

    const counts = getCounts(data);

    document.getElementById("studentCount").textContent = counts.studentCount;
    document.getElementById("instructorCount").textContent = counts.instructorCount;
    document.getElementById("employeeCount").textContent = counts.employeeCount;

    renderStudentAgeChart(data.students);
    renderDepartmentPieChart(data.instructors);

};

loadDashboard();

setInterval(loadDashboard, 5000);
