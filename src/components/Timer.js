import { useState, useEffect } from "react";
import styles from "../styles/Level.module.css";

const Timer = ({stopGame, getTime}) => {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        const updateTimer = () => {
            if(seconds + 1 > 59){
                setSeconds(0);
                if(minutes + 1 > 59){
                    setMinutes(0);
                    setHours(hours+1);
                } else{setMinutes(minutes+1)};
            } else{setSeconds(seconds+1)};
        }
        let interval = setInterval(updateTimer, 1000);
        if(stopGame){
            clearInterval(interval);
            getTime(hours, minutes, seconds);
        }
        return () => clearInterval(interval);
    }, [seconds, minutes, hours, stopGame]);

    return (
        <div className={styles.timer}>
            <span className={styles.timeSpan}>{hours < 10 ? `0${hours}` : hours}:</span>
            <span className={styles.timeSpan}>{minutes < 10 ? `0${minutes}` : minutes}:</span>
            <span className={styles.timeSpan}>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
    )
};

export default Timer;