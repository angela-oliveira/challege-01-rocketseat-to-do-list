import styles from './Task.module.css'
import check from '../assets/check.svg'
import checked from '../assets/checked.svg'

import { Trash } from 'phosphor-react';
import { ITask } from './TaskList';
import { useState } from 'react';

interface TaskProps {
    task: ITask
    onDeleteTask: (task: ITask) => void
    onChangeIsComplete: (task: ITask) => void
}
export function Task({task, onDeleteTask, onChangeIsComplete}: TaskProps) {
    const [checkIcon, setCheckIcon] = useState(check)
    function handleDeleteTask () {
        onDeleteTask(task)
    }
    
    function handleChangeIsComplete() {
        if(checkIcon == check) {
            setCheckIcon(checked)
        } else {
            setCheckIcon(check)
        }
        onChangeIsComplete(task);
    }
    return (
        <div className={styles.task}>
            <div 
                className={styles.iconCheck}
                onClick={handleChangeIsComplete}
            >
                <img src={checkIcon} />
            </div>
            <div className={task.isComplete ? styles.textChecked : styles.textCheck}>{task.title}</div>
            <button onClick={handleDeleteTask}>
                <Trash size={24} />
            </button>
        </div>
    )
}