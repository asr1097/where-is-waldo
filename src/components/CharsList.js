import { v4 as uuid } from "uuid";
import styles from "../styles/Level.module.css";

const CharsList = ({chars, pos, width, checkClick, height}) => {
    let top;
    let left;
    if(pos[0] + width / 10 >= width){
        let sum=pos[0]-width/10;
        left=`${sum}px`;
    } else{left = `${pos[0]}px`};
    if(pos[1] + 3*40 >= height){
        let sum = pos[1] - (chars.length)*40;
        top = `${sum}px`;
    } else{top = `${pos[1]+1}px`;}

    return (
        <div className={styles.onclickDiv} style={{
            top: `${top}`,
            left: `${left}`,
        }}>
            {chars.map(char => {
                return  <div id={char.name} key={uuid()} style={{height: `${(width/100)*5}px`}} className={styles.onclickChar} onClick={checkClick}>
                          <p>{char.name}</p>
                          <img className={styles.onclickImg} src={char.png} alt={char.name}></img>
                        </div>
            })}
        </div>
    )
}

export default CharsList;