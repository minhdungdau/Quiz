import styles from "./End.module.css";
import { Link } from "react-router-dom";
function Start({score, timeTotal}) {
  return (
    <main>
      <h1>Score:{score}</h1>
      <h1>{score} / 10</h1>
      <h1>Time: {timeTotal}s</h1>
      <Link to="/">
        <button className={styles.button}>Replay</button>
      </Link>
    </main>
  );
}

export default Start;
