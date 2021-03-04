import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

let countDownTimeout: NodeJS.Timeout;
let timeDefault: number = 0.1 * 60;

export function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(timeDefault);
    const [isActive, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const secounds = time % 60;

    const [minuteLeft, minuteRight]: any = String(minutes).padStart(2, '0');
    const [secoundLeft, secoundRight]: any = String(secounds).padStart(2, '0');

    function startCountDown() {
        setActive(true);
    }

    function resetCountDown() {
        setActive(false);
        clearTimeout(countDownTimeout);
        setTime(timeDefault);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0){
            setHasFinished(true);
            setActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

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
            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                     Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
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