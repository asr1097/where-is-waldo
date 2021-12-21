import { useState, useEffect } from "react";
import Loader from "./Loader";
import ScoreboardLevels from "./ScoreboardLevels";
import ScoreboardTable from "./ScoreboardTable";
import styles from "../styles/Scoreboard.module.css";

const Scoreboard = ({easy, medium, hard, level, getScoreboardData}) => {

    const [selectedLevel, setSelectedLevel] = useState(level);
    const [data, setData] = useState();

    const convertTimeToString = (seconds) => {
        let h = parseInt(seconds / 3600);
        if (h < 10){h = `0${h}`};
        let m = parseInt((seconds % 3600) / 60);
        if(m < 10){m = `0${m}`};
        let s = parseInt((seconds % 3600) % 60);
        if(s < 10){s = `0${s}`};

        return `${h}:${m}:${s}`;
    };

    useEffect(() => {
        switch(selectedLevel){
            case "easy":
                setData(easy);
                break;
            case "medium":
                setData(medium);
                break;
            case "hard":
                setData(hard);
                break;
            default:
                break;
        };
    }, [selectedLevel, easy, medium, hard]);

    useEffect(() => {
        if(!level){
            setSelectedLevel("easy");
        }
    }, [easy, medium, hard]);

    return(
        <div className={styles.main}>
            {data ?
            <div className={styles.container}> 
                <ScoreboardLevels handleClick={setSelectedLevel} />
                <ScoreboardTable data={data} convert={convertTimeToString} level={selectedLevel}/>
            </div>
            :   <div className={styles.loaderDiv}>
                    <Loader />
                </div>}
        </div>
    );
};

export default Scoreboard;