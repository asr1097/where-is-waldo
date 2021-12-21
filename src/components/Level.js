import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styles from "../styles/Level.module.css";
import CharsList from "./CharsList";
import ScoreForm from "./ScoreForm";
import Hit from "./Hit";
import Timer from "./Timer";

const Level = ({image, chars, measure, handleSubmit, getScoreboard}) => {

    const [onclickDivPos, setOnclickDivPos] = useState([0, 0]);
    const [showOnclickDiv, setShowOnclickDiv] = useState(false);
    const [xCoord, setxCoord] = useState(0);
    const [yCoord, setyCoord] = useState(0);
    const [imgWidth, setimgWidth] = useState(0);
    const [imgHeight, setimgHeight] = useState(0);
    const [charsHits, setCharsHits] = useState([]);
    const [stopGame, setStopGame] = useState(false);
    const [showForm, setshowForm] = useState(false);
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds]= useState();
    const [hits, setHits] = useState([]);
    
    const showDiv = (ev) => {
        if(stopGame){return};
        let imgWidthCurrent = ev.target.width;
        let imgHeightCurrent = ev.target.height;
        if(imgWidth !== imgWidthCurrent){setimgWidth(imgWidthCurrent)};
        if(imgHeight !== imgHeightCurrent){setimgHeight(imgHeightCurrent)};
        let imgX = ev.nativeEvent.offsetX;
        let imgY = ev.nativeEvent.offsetY;
        setxCoord(imgX);
        setyCoord(imgY);
        let pageX = ev.pageX;
        let pageY = ev.pageY;
        setOnclickDivPos([pageX, pageY]);
        setShowOnclickDiv(true);
    };

    const checkClick = (ev) => {
        let name = ev.currentTarget.id;

        switch(name){
            case "Waldo":
                let xLeft = (imgWidth/100)*measure.waldo.x;
                let xRight = (imgWidth/100)*measure.waldo.x + (imgWidth/100)*measure.fieldWidth;
                let yTop = (imgHeight/100)*measure.waldo.y;
                let yBottom = (imgHeight/100)*measure.waldo.y + (imgWidth/100)*measure.fieldWidth;
                if(xCoord >= xLeft && xCoord <= xRight && yCoord >= yTop && yCoord <= yBottom){
                    setShowOnclickDiv(false);
                    setHits([...hits, {
                        xLeft,
                        yTop,
                        fieldWidth: (imgWidth/100)*measure.fieldWidth
                    }]);
                    registerHit(name);
                
                } else{setShowOnclickDiv(false)};
                break;

            case "Wenda":
                let xLeft1 = (imgWidth/100)*measure.wenda.x;
                let xRight1 = (imgWidth/100)*measure.wenda.x + (imgWidth/100)*measure.fieldWidth;
                let yTop1 = (imgHeight/100)*measure.wenda.y;
                let yBottom1 = (imgHeight/100)*measure.wenda.y + (imgWidth/100)*measure.fieldWidth;
                if(xCoord >= xLeft1 && xCoord <= xRight1 && yCoord >= yTop1 && yCoord <= yBottom1){
                    setShowOnclickDiv(false);
                    setHits([...hits, {
                        xLeft: xLeft1,
                        yTop: yTop1,
                        fieldWidth: (imgWidth/100)*measure.fieldWidth
                    }]);
                    registerHit(name);
                } else{setShowOnclickDiv(false)};
                break;

            case "Wizard":
                let xLeft2 = (imgWidth/100)*measure.wizard.x;
                let xRight2 = (imgWidth/100)*measure.wizard.x + (imgWidth/100)*measure.fieldWidth;
                let yTop2 = (imgHeight/100)*measure.wizard.y;
                let yBottom2 = (imgHeight/100)*measure.wizard.y + (imgWidth/100)*measure.fieldWidth;
                if(xCoord >= xLeft2 && xCoord <= xRight2 && yCoord >= yTop2 && yCoord <= yBottom2){
                    setShowOnclickDiv(false);
                    setHits([...hits, {
                        xLeft: xLeft2,
                        yTop: yTop2,
                        fieldWidth: (imgWidth/100)*measure.fieldWidth
                    }]);
                    registerHit(name);
                } else{setShowOnclickDiv(false)};
                break;

            case "Odlaw":
                let xLeft3 = (imgWidth/100)*measure.odlaw.x;
                let xRight3 = (imgWidth/100)*measure.odlaw.x + (imgWidth/100)*measure.fieldWidth;
                let yTop3 = (imgHeight/100)*measure.odlaw.y;
                let yBottom3 = (imgHeight/100)*measure.odlaw.y + (imgWidth/100)*measure.fieldWidth;
                if(xCoord >= xLeft3 && xCoord <= xRight3 && yCoord >= yTop3 && yCoord <= yBottom3){
                    setShowOnclickDiv(false);
                    setHits([...hits, {
                        xLeft: xLeft3,
                        yTop: yTop3,
                        fieldWidth: (imgWidth/100)*measure.fieldWidth
                    }]);
                    registerHit(name);
                } else{setShowOnclickDiv(false)};
                break;

            default:
                break;
        }
    }

    const registerHit = (name) => {
        let charsHitsCopy = [];
        charsHits.map(char => charsHitsCopy.push(char))
        let index = charsHitsCopy.findIndex(char => char.name === name);
        let charHit = charsHitsCopy[index];
        charHit = {...charHit, hit: true};
        charsHitsCopy.splice(index, 1, charHit);
        setCharsHits(charsHitsCopy);
    };

    const getTime = (h, m, s) => {
        setHours(h);
        setMinutes(m);
        setSeconds(s);
    };

    useEffect(() => {
        let charsHitsCopy = [];
        chars.map(char => charsHitsCopy.push(char))
        setCharsHits(charsHitsCopy) 
    }, [chars]);

    useEffect(() => {
        const allFound = () => {
            return charsHits.every(char => char.hit); 
        };
        if(allFound() && charsHits.length > 0){
            setStopGame(true);
        };
    }, [charsHits]);

    useEffect(() => {
        if(stopGame && hours !== undefined && minutes !== undefined && seconds !== undefined){
            setTimeout(() => setshowForm(true), 300)
        };
    }, [hours, minutes, seconds, stopGame]);
    
    return(
        <div className={styles.mainDiv}>
            <div className={styles.infoDiv}>
                <Timer stopGame={stopGame} getTime={getTime} />
                <div className={styles.charsDiv}>
                    <p className={styles.findThem}>Find them</p>
                    <div className={styles.chars}>
                    {chars.map(char => {
                        return  <div key={uuid()} className={styles.char}>
                                <p>{char.name}</p>
                                <img src={char.png} alt={char.name}></img> 
                                </div>
                    })}
                    </div>
                </div>
            </div>
            <div className={styles.imgDiv}>
                <img onClick={showDiv} src={image} alt="Level" className={styles.levelImg}/>
            
                {hits.map(hit => {
                  return <Hit key={uuid()} info={hit} />
            })}
            </div>
           
            {showOnclickDiv ? <CharsList 
                                chars={chars} 
                                pos={onclickDivPos} 
                                width={imgWidth} 
                                height={imgHeight}
                                checkClick={checkClick}
            />  : null}
            {showForm ? <ScoreForm 
                                h={hours} 
                                m={minutes} 
                                s={seconds} 
                                handleSubmit={handleSubmit}
                                getScoreboard={getScoreboard}
            /> : null}
            
        </div>
    );
}

export default Level;
