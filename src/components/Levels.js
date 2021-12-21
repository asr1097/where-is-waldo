import { useState, useEffect } from "react";
import Loader from "./Loader";
import styles from "../styles/Levels.module.css";

const Levels = ({images, pngs, measures, getData, getLevel}) => {

    const [level, setLevel] = useState("easy");
    const [levelImage, setLevelImage] = useState();
    const [levelMeasure, setLevelMeasure] = useState();
    const [levelChars, setLevelChars] = useState();

    const setLevelProps = () => {
        switch(level) {
            case "easy":
                setLevelImage(images.image1);
                setLevelMeasure(measures.image1);
                setLevelChars([
                    {
                        name: "Waldo",
                        png: pngs.waldoImg,
                        hit: false
                    }
                ]);
                getLevel(level);
                break;

            case "medium":
                setLevelImage(images.image2);
                setLevelMeasure(measures.image2);
                setLevelChars([ 
                    {
                        name: "Waldo",
                        png: pngs.waldoImg,
                        hit: false
                    },
                    {  
                        name: "Wenda",
                        png: pngs.wendaImg,
                        hit: false
                    }
                ]);
                getLevel(level);
                break;

            case "hard":
                setLevelImage(images.image3);
                setLevelMeasure(measures.image3);
                setLevelChars([
                    {
                        name: "Waldo",
                        png: pngs.waldoImg,
                        hit: false
                    }, 
                    {
                        name: "Wizard",
                        png: pngs.wizardImg,
                        hit: false
                     },
                     { 
                        name: "Odlaw",
                        png: pngs.odlawImg,
                        hit: false
                     }
                ]);
                getLevel(level);
                break;
            
            default:
                break;
        };
    }

    useEffect(() => {
        if(levelMeasure && levelImage && levelChars){
            getData(levelImage, levelChars, levelMeasure);
        };
    }, [levelChars, levelImage, levelMeasure, getData]);

    return (
        <div className={styles.mainDiv}>
            <div className={styles.container}>
                <div className={styles.easyDiv}>
                    <p className={styles.levelName}>EASY</p>
                    <div onClick={() => setLevel("easy")} 
                        className={level === "easy" ? `${styles.levelDiv} ${styles.active}` : styles.levelDiv} 
                        >
                        {images.image1 ? 
                        <img src={images.image1} alt="Easy level" className={styles.image}></img>
                        : <Loader />
                        }
                    </div>
                </div>
                <div className={styles.mediumDiv}>
                    <p className={styles.levelName}>MEDIUM</p>
                    <div onClick={() => setLevel("medium")}
                        className={level === "medium" ? `${styles.levelDiv} ${styles.active}` : styles.levelDiv} >
                        {images.image2 ?
                        <img src={images.image2} alt="Medium level" className={styles.image}></img>
                        : <Loader />
                        }
                    </div>
                </div>
                <div className={styles.hardDiv}>
                    <p className={styles.levelName}>HARD</p>
                    <div onClick={() => setLevel("hard")} 
                        className={level === "hard" ? `${styles.levelDiv} ${styles.active}` : styles.levelDiv} 
                        >
                        {images.image3 ? 
                        <img src={images.image3} alt="Hard level" className={styles.image}></img>
                        : <Loader />
                        }
                    </div>
                </div>
            </div>
            <button className={styles.startButton} onClick={() => setLevelProps()}>START</button>
        </div>

    )
}

export default Levels;