type Reminder = [
  title: string,
  dateHours: Date,
  deadline: Date | undefined,
  description: string | undefined,
];

let reminders: Reminder[] = [];

function addReminder(
  title: string,
  deadline?: Date,
  description?: string,
): void {
  const newReminder: Reminder = [title, new Date(), deadline, description];
  reminders.push(newReminder);
  console.log(`Reminder "${title}" added.`);
  listReminders();
}

function removeReminder(id: number): void {
  reminders.splice(id, 1);
  console.log(`Reminder removed.`);
  listReminders();
}

function editReminder(
  id: number,
  title?: string,
  deadline?: Date,
  description?: string,
): void {
  if (id < 0 || id >= reminders.length) {
    console.error("Invalid reminder ID");
    return;
  }

  const reminder = reminders[id];

  if (!reminder) return;

  if (title !== undefined) {
    reminder[0] = title;
  }
  reminder[2] = deadline;
  if (description !== undefined) {
    reminder[3] = description;
  }

  console.log(`Reminder "${reminder[0]}" updated.`);

  listReminders();
}

function listReminders(): void {
  const container = document.getElementById("reminders");

  if (!container) return;

  container.innerHTML = "";

  reminders.forEach((reminder, index) => {
    const card = document.createElement("div");

    card.innerHTML = `
            <h3>${reminder[0]}</h3>
            <p>Created: ${reminder[1].toLocaleString()}</p>
            <p>Deadline: ${reminder[2]?.toLocaleString() ?? "Not defined"}</p>
            <p>Description: ${reminder[3] ?? "No description"}</p>

    <button class="edit-btn" data-id="${index}">
        Edit
    </button>

    <button class="delete-btn" data-id="${index}">
        Delete
    </button>

            <hr>
        `;

    container.appendChild(card);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));

      removeReminder(id);
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).getAttribute("data-id"));

      const currentReminder = reminders[id];

      if (!currentReminder) return;

      const newTitle = prompt("New title:", currentReminder[0]);

      const deadlineText = prompt(
        "New deadline (YYYY-MM-DD HH:MM):",
        currentReminder[2] ? currentReminder[2].toISOString().slice(0, 16) : "",
      );

      const newDescription = prompt(
        "New description:",
        currentReminder[3] ?? "",
      );

      editReminder(
        id,
        newTitle ?? currentReminder[0],
        deadlineText ? new Date(deadlineText) : currentReminder[2],
        newDescription ?? currentReminder[3],
      );
    });
  });
}

const addBtn = document.getElementById("addBtn");

addBtn?.addEventListener("click", () => {
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const deadlineInput = document.getElementById("deadline") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description",
  ) as HTMLTextAreaElement;

  const title = titleInput.value.trim();

  if (!title) {
    alert("Enter a title");
    return;
  }

  addReminder(
    title,
    deadlineInput.value ? new Date(deadlineInput.value) : undefined,
    descriptionInput.value || undefined,
  );

  titleInput.value = "";
  deadlineInput.value = "";
  descriptionInput.value = "";
});
