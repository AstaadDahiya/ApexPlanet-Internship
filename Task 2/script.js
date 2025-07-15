// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const messageEl = document.getElementById("formMessage");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        messageEl.textContent = "All fields are required.";
        messageEl.style.color = "red";
        return;
    }

    if (!emailRegex.test(email)) {
        messageEl.textContent = "Please enter a valid email address.";
        messageEl.style.color = "red";
        return;
    }

    messageEl.textContent = "Form submitted successfully!";
    messageEl.style.color = "green";

    // Optionally, clear the form
    this.reset();
});

// To-Do List Functionality
function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") return;

    const li = document.createElement("li");
    li.textContent = task;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = () => li.remove();

    li.appendChild(removeBtn);
    document.getElementById("taskList").appendChild(li);

    input.value = "";
}
