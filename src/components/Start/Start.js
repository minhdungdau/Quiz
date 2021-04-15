import styles from "./Start.module.css";

import { Link } from "react-router-dom";
function Start() {
  return (
    <main>
      <h1>Quiz</h1>
      <Link to="/app">
        <button className={styles.button}>Get Start</button>
      </Link>
    </main>
  );
}

export default Start;
