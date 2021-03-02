import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect } from 'react';

export function Countdown() {
    const [time, setTime] = useState(1 * 60);
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const secounds = time % 60;

    const [minuteLeft, minuteRight]: any = String(minutes).padStart(2, '0');
    const [secoundLeft, secoundRight]: any = String(secounds).padStart(2, '0');

    function startCountDown() {
        setActive(true);
    }

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
    }, [active,time])

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
            <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountDown}
            >
                Iniciar um ciclo
            </button>
        </div>
    );
}