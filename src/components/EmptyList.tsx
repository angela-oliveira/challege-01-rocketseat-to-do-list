import styles from './EmptyList.module.css'
import clipboard from '../assets/clipboard.png'

export function EmptyList() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <img src={clipboard} />
                <div>
                    <div className={styles.firstText}>Você ainda não tem tarefas cadastradas</div>
                    <div>Crie tarefas e organize seus itens a fazer</div>
                </div>
            </div>
        </div>
    )
}