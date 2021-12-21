import { useState } from "react";
import styles from "../styles/ScoreForm.module.css";
import ScoreSubmitted from "./ScoreSubmitted";
import { useNavigate } from "react-router-dom";

const ScoreForm = ({h, m, s, handleSubmit, getScoreboard}) => {

    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    let hours = h;
    if(hours < 10){hours = `0${hours}`};
    let minutes = m;
    if(minutes < 10){minutes = `0${minutes}`}
    let seconds = s;
    if(seconds < 10){seconds = `0${seconds}`};
    let timeString = `${hours}:${minutes}:${seconds}`;

    return(
        <div>
            {!submitted ? 
            <div className={styles.main}>
                <h2 className={styles.formH2}>Well done!</h2>
                <p className={styles.formP}>Your time is:</p>
                <h4 className={styles.formH4}>{timeString}</h4>
                <form className={styles.form}>
                    <input placeholder="Enter your name" className={styles.input} value={name} type="text" onChange={(ev) => setName(ev.target.value)}/>
                    <div className={styles.formBtns}>
                        <input className={styles.submitBtn} type="button" onClick={() => {
                            handleSubmit(name, timeString);
                            setSubmitted(true);
                            }} value={"Submit"}/>
                        <input className={styles.cancelBtn} type="button" value="Cancel" onClick={() => navigate("/")}/>
                    </div>
                </form>
            </div>
            : <ScoreSubmitted getScoreboard={getScoreboard}/>}
        </div>
    );
};

export default ScoreForm;