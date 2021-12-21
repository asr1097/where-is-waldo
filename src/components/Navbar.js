import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import WaldoFace from "../images/waldoFace.png";



const Navbar = ({getScoreboard}) => {
    return (
        <nav className={styles.nav}>
            <Link to="/" style={{
                textDecoration: "none",
                marginLeft: "0.8em",
                color: "white"}} className={styles.link}>
                <div className={styles.logo}>
                    <p>Where's Waldo?</p>
                    <img src={WaldoFace} alt="Waldo" className={styles.image}></img>
                </div>
            </Link>
            <Link to="/scoreboard" 
            onClick={getScoreboard} 
            style={{textDecoration: "none"}}
            className={`${styles.link} ${styles.link2}`}
            >
                <button className={styles.button}>SCOREBOARD</button>
            </Link>
        </nav>
    );
};

export default Navbar;