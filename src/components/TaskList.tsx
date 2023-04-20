import styles from './TaskList.module.css'
import { EmptyList } from './EmptyList'
// import { v4 as uuidv4 } from 'uuid';
import { Task } from './Task'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import addIcon from '../assets/add.svg'

export interface ITask {
    id: number;
    title: string;
    isComplete: boolean
}

export function TaskList() {

    const [newTaskText, setNewTaskText] = useState('')

    const [taskContent, setTaskContent] = useState<ITask[]>([])

    const [tasksCompleted, setTasksCompleted] = useState(0)

    function handleCreateNewTask(event: FormEvent) {
        event?.preventDefault()
        setTaskContent(
            [...taskContent, 
                {
                    id: taskContent.length +1, 
                    title: newTaskText, 
                    isComplete: false
                }
            ]
        )
        setNewTaskText('')
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskText(event?.target.value)
    }

    function deleteTask(task: ITask) {
        const taskWithoutDeleteOne = taskContent.filter(e => {
            return e !== task
        })
        setTaskContent(taskWithoutDeleteOne)

    }

    function completeTask(task: ITask) {
        taskContent.map(e => {
            if (e === task) {
                e.isComplete = !task.isComplete
            }
        })
        countTasksCompleted()    
    }
    
    function countTasksCompleted() {
        setTasksCompleted(taskContent.filter(e => e.isComplete).length)
    }
    
    const isNewTaskEmpty = newTaskText.length === 0
    
    useEffect(() => {
        countTasksCompleted()    
    }, [taskContent])
    
    return (
      <main className={styles.wrapper}>
        <div className={styles.content}>
            <form onSubmit={handleCreateNewTask} className={styles.contentForm}>
                <input 
                    className={styles.inputForm} 
                    name='inputTask'
                    placeholder='Adicione uma nova tarefa'
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                    required
                />
                <button 
                    type="submit" 
                    className={styles.buttonForm}
                    disabled={isNewTaskEmpty}
                >
                    <div>
                        Criar
                    </div>
                    <img src={addIcon} />

                </button>
            </form>
            <div className={styles.main}>
                <div className={styles.infoTasks}>
                    <div className={styles.createdTask}>
                        <div className={styles.text}>
                            Tarefas criadas
                        </div>
                        <div className={styles.countTask}>
                            {taskContent.length}
                        </div>
                    </div>
                    <div className={styles.completedTask}>
                        <div className={styles.text}>
                            Concluídas
                        </div>
                        <div className={styles.countTask}>
                            {tasksCompleted} de {taskContent.length}
                        </div>

                    </div>
                </div>
                {taskContent.length > 0 ?
                    <div className={styles.tasks}>
                        {taskContent.map(e => {
                            return (
                                <Task 
                                    key={e.id} 
                                    task={e}
                                    onDeleteTask={deleteTask}
                                    onChangeIsComplete={completeTask}
                                />
                            )
                        }
                        )}
                    </div> :
                    <EmptyList />
                }
            </div>
        </div>
      </main>
    )
}