// import { create } from 'lodash';

const taskapp = () => {
  class Task {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.taskTitle = document.querySelector('#task-description');
      this.taskStatus = document.querySelector('#author');
      this.taskDisplay = document.querySelector('#display');
      this.buttonAdd = document.querySelector('#add');
      this.clearall = document.querySelector('#clearall');
      this.checkboxStatus = document.querySelector('#checkboxid');
      this.render();
    }

    addTask(id, title, status) {
      this.tasks.push({ id, title, status });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.render();
    }

    removeTask(index) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.render();
    }

    newEditTask(index) {  // eslint-disable-line
      // eslint-disable-next-line
      const toBeEdited = event.target.parentElement.parentElement.firstChild.nextElementSibling.lastChild.previousElementSibling;
      toBeEdited.contentEditable = 'true';
      toBeEdited.style.border = '1px solid black';

      if (event.target.classList.contains('fa-solid')) {// eslint-disable-line

        event.target.parentElement.parentElement.style.backgroundColor = ' #f6ee78';// eslint-disable-line
      }

      event.target.style.display = 'none';// eslint-disable-line
      toBeEdited.addEventListener('keypress', (target) => {
        if (target.key === 'Enter') {
          const id = `${new Date().getTime()}`;
          const title = toBeEdited.innerText;
          const status = false;
          // eslint-disable-next-line
          task.addTask(id, title, status);

        }

        // localStorage.setItem('tasks', JSON.stringify(this.tasks));
      });
      this.tasks.splice(index, 1);
    }

    addTaskUpdate(index) {
      this.tasks.splice(index, 0);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.render();
    }

    myCheckbox(target) {
      this.tasks.forEach((task) => {
        // eslint-disable-next-line
         let toBeEdited = target.parentElement.parentElement.firstChild.nextElementSibling.lastChild.previousElementSibling;
        if (target.id === task.id) {
          if (target.checked) {
            toBeEdited.style.textDecoration = 'line-through';
            task.status = true;
          } else {
            task.status = false;
            toBeEdited.style.textDecoration = 'none';
          }
        }
      });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    render() {
      this.taskDisplay.innerHTML = '';
      this.taskDisplay.classList.add('task_container');
      if (this.tasks.length === 0) {
        this.taskDisplay.classList.remove('task_container');
      }

      this.tasks.forEach((task, index) => {
        const ListDiv = document.createElement('div');
        ListDiv.innerHTML = `
            <div>
              <input type="checkbox" class="checkbox" id=${task.id}>
              <span> ${task.title} </span>
            </div>
            <div>
            <button class="fa-solid fa-pen-to-square"  data-index-edit ="${index}"></button>
            <button class="material-symbols-outlined"  data-index="${index}">delete</button>
           
            </div>
                  `;

        if (index % 2 === 0) {
          ListDiv.style.background = '#dddddd';
        } else {
          ListDiv.style.background = '#fff';
        }

        this.taskDisplay.appendChild(ListDiv);
        ListDiv.classList.add('task_list_container');
      });

      document.querySelectorAll('.fa-solid').forEach((event) => {
        event.addEventListener('click', () => {
          this.newEditTask(event.getAttribute('data-index-edit'));
        });
      });
      document.querySelectorAll('.material-symbols-outlined').forEach((button) => {
        button.addEventListener('click', () => {
          this.removeTask(button.getAttribute('data-index'));
        });
      });

      document.querySelectorAll('.checkbox').forEach((checkbox) => {
        checkbox.addEventListener('click', (event) => {
          this.myCheckbox(event.target);
        });
      });

      document.querySelectorAll('.clear-completed-task').forEach((button) => {
        button.addEventListener('click', () => {
          this.tasks = this.tasks.filter((tasklist) => !tasklist.status);
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
          const completedElements = document.querySelectorAll('.checkbox');
          completedElements.forEach((element) => element.remove());
        });
      });
    }
  }

  const task = new Task();

  task.buttonAdd.addEventListener('click', () => {
    const id = `${new Date().getTime()}`;
    const title = task.taskTitle.value;
    const status = false;
    task.addTask(id, title, status);
    task.taskTitle.value = '';
    task.taskStatus.value = '';
  });
};
export default taskapp;