import styles from "../styles/Scoreboard.module.css";

const ScoreboardLevels = ({handleClick}) => {
    return (
        <div className={styles.btnsDiv}>
            <button className={styles.easyBtn} onClick={() => handleClick("easy")}>Easy</button>
            <button className={styles.mediumBtn} onClick={() => handleClick("medium")}>Medium</button>
            <button className={styles.hardBtn} onClick={() => handleClick("hard")}>Hard</button>
        </div>
    );
};

export default ScoreboardLevels;