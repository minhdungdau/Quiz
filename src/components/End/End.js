import styles from "./End.module.css";
import { Link } from "react-router-dom";
function Start({score, timeTotal, maxQuestion }) {
  return (
    <main>
      <h1>Score:{score}</h1>
      <h1>{score} / {maxQuestion}</h1>
      <h1>Time: {Math.ceil(timeTotal)}s</h1>
      <Link to="/">
        <button className={styles.button}>Replay</button>
      </Link>
    </main>
  );
}

export default Start;
