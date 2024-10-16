let editIndex = null; // Track which entry is being edited

function validateForm() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    if (name === "") {
        alert("Name is required!");
        return false;
    }
    if (age === "" || age < 18) {
        alert("Age must be 18 or above.");
        return false;
    }
    if (email === "" || !email.includes("@")) {
        alert("Enter a valid email address.");
        return false;
    }
    if (department === "") {
        alert("Department is required!");
        return false;
    }
    return true;
}

function showData() {
    const peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    let html = "";

    peopleList.forEach((person, index) => {
        html += `<tr>
                    <td>${person.name}</td>
                    <td>${person.age}</td>
                    <td>${person.email}</td>
                    <td>${person.department}</td>
                    <td>
                        <button class="btn btn-warning m-2" onclick="editData(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteData(${index})">Delete</button>
                    </td>
                 </tr>`;
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

function AddData() {
    if (validateForm()) {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const email = document.getElementById("email").value;
        const department = document.getElementById("department").value;

        const peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

        peopleList.push({ name, age, email, department });
        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        showData();
        clearForm();
    }
}

function editData(index) {
    const peopleList = JSON.parse(localStorage.getItem("peopleList"));
    const person = peopleList[index];

    document.getElementById("name").value = person.name;
    document.getElementById("age").value = person.age;
    document.getElementById("email").value = person.email;
    document.getElementById("department").value = person.department;

    document.getElementById("addBtn").classList.add("d-none");
    document.getElementById("updateBtn").classList.remove("d-none");

    editIndex = index;
}

function updateData() {
    if (validateForm()) {
        const peopleList = JSON.parse(localStorage.getItem("peopleList"));

        peopleList[editIndex] = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            email: document.getElementById("email").value,
            department: document.getElementById("department").value,
        };

        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        showData();
        clearForm();

        document.getElementById("addBtn").classList.remove("d-none");
        document.getElementById("updateBtn").classList.add("d-none");

        editIndex = null;
    }
}

function deleteData(index) {
    const peopleList = JSON.parse(localStorage.getItem("peopleList"));

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    showData();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
}

document.onload = showData();
