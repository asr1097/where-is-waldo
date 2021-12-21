import { useNavigate } from "react-router-dom";
import styles from "../styles/ScoreForm.module.css";

const ScoreSubmitted = ({getScoreboard}) => {

    const navigate = useNavigate();

    return (
        <div className={styles.main}>
            <h2 className={styles.formH2}>Score submitted!</h2>
            <div className={styles.formBtns}>
                <button className={styles.cancelBtn} onClick={() => {
                    getScoreboard();
                    navigate("/scoreboard")
                }}>Scoreboard</button>
                <button className={styles.submitBtn} onClick={() => navigate("/")}>Go back</button>
            </div>
        </div>
    );
};

export default ScoreSubmitted;