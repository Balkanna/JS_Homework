import Utils from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`     
                <h1 class="page-title">Tasks List</h1>
                                                  
                <div class="task-add">
                    <input class="task-add__title" type="text" placeholder="Task title">
                             
                    <input class="task-add__description" type="text" placeholder="Task description">
                    
                    <button class="task-add__btn-add button" disabled>Add Task</button>
                </div>  
                 
                <div class="tasks">
                    <div class="task-clear">
                        <div class="count-tasks"></div>
                        <button id="buttonClear" class="task-add__btn-add button" ${!this.tasks.length ? 'disabled' : ''}>Clear tasks list</button>
                    </div>
                    
                    <div class = "tasks__list">
                        ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                    </div>
                </div>            
            `);
        });
    }

    afterRender() {
        this.setActions();
        this.countNumberTasks();
    }

    setActions() {
        const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
            addTaskDescription = document.getElementsByClassName('task-add__description')[0],
			addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
			tasksContainer = document.getElementsByClassName('tasks')[0],
			tasksList = document.getElementsByClassName('tasks__list')[0],
            buttonClear = document.getElementById('buttonClear');

        addTaskTitle.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskTitle.value.trim());
        addTaskBtn.addEventListener('click', () => {
            this.addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList);
            this.setBtnVisibility(buttonClear, false);
        });
        buttonClear.addEventListener('click', () => this.clearTasks());

		tasksContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(target.parentNode.parentNode);
                    break;
            }
        });
    }

    addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList) {
		const newTask = {
			id: Utils.generateID(),
			title: addTaskTitle.value.trim(),
            description: addTaskDescription.value.trim() || 'None',
			status: 'In Progress'
		};

        this.tasks.push(newTask);
        Tasks.setTasksToLS(this.tasks);

		this.clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));
        this.countNumberTasks();

    }

    getTaskHTML(task) {
        return `
            <div class="task" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                    <a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a> 
                    <a class="task__btn-done button">Done</a> 
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(addTaskTitle, addTaskDescription, addTaskBtn) {
		addTaskTitle.value = '';
        addTaskDescription.value = '';
        addTaskBtn.disabled = true;
        this.setBtnVisibility(buttonClear, true);
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    clearTasks () {
        if (confirm ('Delete all tasks? Are you sure?')) {
            Tasks.setTasksToLS([]);
            document.getElementsByClassName('tasks__list')[0].innerHTML = '';
            this.tasks = [];
            this.countNumberTasks();
            this.setBtnVisibility(buttonClear, true);
        }
    }

    countNumberTasks() {
        let numberTasks = document.getElementsByClassName('task').length;
             document.getElementsByClassName('count-tasks')[0].innerText = numberTasks ?
            `There are ${numberTasks} task(s)` : 'Tasks list is empty';
    }

    removeTask(taskContainer) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            Tasks.setTasksToLS(this.tasks);

            taskContainer.remove();
            this.countNumberTasks();
        }
        if (!this.tasks.length) {
            this.setBtnVisibility(buttonClear, true);
        }
    }
    setBtnVisibility(btn, flag) {
        btn.disabled = flag;
    }

}

export default AddAndList;