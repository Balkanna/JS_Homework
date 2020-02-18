import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

class Info extends Component {
    constructor() {
        super();

        this.task = this.tasks.find(task => task.id === this.request.id);
    }

    render() {
        return new Promise(resolve => {
            let html;

            if (this.task) {
                const {id, title, description, status} = this.task;
                
				html = `
					<h1 class="page-title">Task Info</h1>
					
					<div class="task-info">
						<p>
							<b>Task Title:</b>
							${title}
						</p>
						<p>
						    <b>Task Description:</b>
						    ${description}
                        </p>
						<p>
							<b>Task Status:</b>
							${status}
						</p>
						
						<div class="task-info__buttons">
							<a class="task-info__btn-edit button" href="#/task/${id}/edit">Edit Task</a>
							<a class="task-info__btn-back button" href="#/tasks">Back to List</a>
						</div>
					</div>
				`;
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }
}

export default Info;