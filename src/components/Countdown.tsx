import styles from '../styles/components/Countdown.module.css';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext'

export function Countdown() {
    const {
        minutes,
        hasFinished,
        isActive,
        secounds,
        resetCountDown,
        startCountDown
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight]: any = String(minutes).padStart(2, '0');
    const [secoundLeft, secoundRight]: any = String(secounds).padStart(2, '0');


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secoundLeft}</span>
                    <span>{secoundRight}</span>
                </div>
            </div>
            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button type="button"
                                className={`${styles.countdownButton} 
                            ${styles.countdownButtonActive}`}
                                onClick={resetCountDown}>
                                Abandonar ciclo
                            </button>
                        ) : (

                                <button type="button"
                                    className={styles.countdownButton}
                                    onClick={startCountDown}>
                                    Iniciar um ciclo
                                </button>

                            )
                        }

                    </>

                )}

        </div>
    );
}