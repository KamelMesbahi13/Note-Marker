const taskId = document.querySelector('.task-edit');
const taskName = document.querySelector('.task-edit-name');
const taskCompleted = document.querySelector('.task-edit-completed');
const editForm = document.querySelector('.single-task-form');
const editBtn = document.querySelector('.task-edit-btn');
const formAlert = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

const showNote = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id: taskId, completed, name } = task;

    taskId.textContent = taskId;
    taskName.value = name;
    tempName = name;

    if (completed) {
      taskCompleted.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showNote();

editForm.addEventListener('submit', async (e) => {
  editBtn.textContent = 'Loading..';
  e.preventDefault();
  try {
    const taskNames = taskName.value;
    const taskCompleteded = taskCompleted.checked;

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskNames,
      completed: taskCompleteded,
    });

    const { _id: taskID, completed, name } = task;

    taskID.textContent = taskID;
    taskName.value = name;
    tempName = name;
    if (completed) {
      taskCompleted.checked = true;
    }
    formAlert.style.display = 'block';
    formAlert.textContent = 'Success, Edited Task';
    formAlert.classList.add('text-success');
  } catch (error) {
    console.error(error);
    taskName.value = tempName;
    formAlert.style.display = 'block';
    formAlert.innerHTML = `error, please try again`;
  }

  editBtn.textContent = 'Edit';
  setTimeout(() => {
    formAlert.style.display = 'none';
    formAlert.classList.remove('text-success');
  }, 3000);
});
