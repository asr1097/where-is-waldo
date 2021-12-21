import { v4 as uuid } from "uuid";
import styles from "../styles/Scoreboard.module.css";

const ScoreboardTable = ({data, convert, level}) => {

    const capitalizeString = (str) => {
        let capString = str.charAt(0).toUpperCase() + str.slice(1, str.length)
        return capString;
    }

   return (
        <div className={styles.tableDiv} >
            <p>{capitalizeString(level)}</p>
            <table className={styles.table}> 
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>  
                </thead>
                <tbody>
                    {data.map((score, index) => {
                        return (
                        <tr key={uuid()}>
                            <td className={styles.bold}>{`${index+1}.`}</td>
                            <td>{score.name}</td>
                            <td className={styles.bold}>{convert(score.time)}</td>
                        </tr>)
                    })} 
                </tbody>
            </table>
        </div>
   );
};

export default ScoreboardTable;