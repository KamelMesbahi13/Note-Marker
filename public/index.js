const tasksHandler = document.querySelector('.tasks');
const taskForm = document.querySelector('.task-form');
const input = document.querySelector('.input');
const formAlert = document.querySelector('.form-alert');

// Display The Note
const showNote = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks');
    if (tasks.length < 1) {
      tasksHandler.innerHTML = '<h5="no-note">No Note In Your List</h5=>';
      return;
    }

    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">

<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
      })
      .join('');
    tasksHandler.innerHTML = allTasks;
  } catch (error) {
    tasksHandler.innerHTML =
      '<h5 class="no-note">There was an error, please try later....</h5>';
  }
};

showNote();

// Delete THe Note

tasksHandler.addEventListener('click', async (e) => {
  const element = e.target;
  if (element.parentElement.classList.contains('delete-btn')) {
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showNote();
    } catch (error) {
      console.log(error);
    }
  }
});

// The Form Action

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = input.value;
  try {
    await axios.post('/api/v1/tasks', { name });
    showNote();
    input.value = '';
    formAlert.style.display = 'block';
    formAlert.textContent = 'Success, Task Added';
    formAlert.classList.add('success');
  } catch (error) {
    formAlert.style.display = 'block';
    formAlert.innerHTML = 'error, please try again';
  }

  setTimeout(() => {
    formAlert.style.display = 'none';
    formAlert.classList.remove('success');
  }, 3000);
});
