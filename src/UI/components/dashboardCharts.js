let studentChart;
let departmentPieChart;


export const renderStudentAgeChart = (students) => {

    const grouped = students.reduce((acc, s) => {
        acc[s.age] = (acc[s.age] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    if (studentChart) {
        studentChart.destroy();
    }

    studentChart = new Chart(
        document.getElementById("studentAgeChart"),
        {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: "Students Age Distribution",
                    data: values,
                    datasets: [{
                            data: values,
                            backgroundColor: [
                                "#4CAF50",
                                "#2196F3",
                                "#FF9800",
                                "#E91E63",
                                "#9C27B0",
                                "#00BCD4"
                            ]
                    }],
                    options: {
                        maintainAspectRatio: false,
                }
                }]
            }
        }
    );
};


export const renderDepartmentPieChart = (instructors) => {

    const grouped = instructors.reduce((acc, inst) => {
        acc[inst.department] = (acc[inst.department] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    if (departmentPieChart) {
        departmentPieChart.destroy();
    }

    departmentPieChart = new Chart(
        document.getElementById("departmentPieChart"),
        {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data: values
                }],
                options: {
                        maintainAspectRatio: false,
                        responsive: true
                }
            }
        }
    );
};

