function getMajorsByDepartment() {
    const departmentDropdown = document.getElementById("department");
    const majorDropdown = document.getElementById("major");

    let selectedDepartmentId = departmentDropdown.value; // Initialize with the current value

    // Function to populate the major dropdown
    function populateMajorDropdown(majors) {
        majorDropdown.innerHTML = "";
        majors.forEach(major => {
            const option = document.createElement("option");
            option.value = major.id;
            option.text = major.name;
            majorDropdown.appendChild(option);
        });
    }

    // Add an event listener for department change
    departmentDropdown.addEventListener("change", function () {
        selectedDepartmentId = this.value; // Update the selected department
        fetch(`/server/api/majors?departmentId=${selectedDepartmentId}`)
            .then(response => response.json())
            .then(majors => {
                populateMajorDropdown(majors);
            })
            .catch(error => console.error(error));
    });

    // Load majors when the document is fully loaded
    document.addEventListener("DOMContentLoaded", function () {
        fetch(`/server/api/majors?departmentId=${selectedDepartmentId}`)
            .then(response => response.json())
            .then(majors => {
                populateMajorDropdown(majors);
            })
            .catch(error => console.error(error));
    });
}

getMajorsByDepartment();