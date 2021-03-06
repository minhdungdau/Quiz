 /* eslint-disable */
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getData } from "../api";
const arrAnswer = [
  "answer_a",
  "answer_b",
  "answer_c",
  "answer_d",
  "answer_e",
  "answer_f",
];

function App({
  score,
  setScore,
  timeTotal,
  setTimeTotal,
  timePerQuestion,
  maxQuestion,
}) {
  const [question, setQuestion] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function confirmAnswer(answer) {
    if (questionCount >= maxQuestion) {
      history.push("/end");
    }

    if (answer === "true") {
      setScore(score + 1);
    }
    randomQuestion(questionList);
    setQuestionCount(questionCount + 1);
  }

  function randomQuestion(list) {
    shuffle(arrAnswer);
    let randomNumberQuestion = Math.floor(Math.random() * list.length);
    setQuestion(list[randomNumberQuestion]);
    let cloneList = [...list];
    cloneList.splice(randomNumberQuestion, 1);
    setQuestionList(cloneList);
    setCountdown(timePerQuestion);
  }

  function RenderQuestion() {
    return (
      <>
        <div className={styles.question}>
          <span className="question-number">{questionCount}. </span>
          {question.question}
        </div>
        <div className={styles.answers}>
          {arrAnswer.map((ele) => {
            if (question.answers?.[ele] != null)
              return (
                <div
                  className={styles.answersChoice}
                  key={ele}
                  onClick={() => {
                    confirmAnswer(question.correct_answers?.[ele + "_correct"]);
                  }}
                >
                  {question.answers?.[ele]}
                </div>
              );
          })}
        </div>
        <div className={styles.time}>{countdown}</div>
      </>
    );
  }

  //L???y d??? li???u
  useEffect(() => {
    async function fetchData() {
      let data = await getData();
      setLoading(false);
      randomQuestion(data);
      setScore(0);
      setTimeTotal(0);
      setCountdown(timePerQuestion);
    }
    fetchData();
  }, []);

  // T???ng th???i gian tr??? l???i
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeTotal(timeTotal + 0.5);
    }, 500);
    return () => {
      clearTimeout(timeInterval);
    };
  }, [timeTotal]);

  // ?????m th???i gian m???i c??u h???i
  useEffect(() => {
    if (question === []) return;
    const timeInterval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    if (countdown === 0) {
      confirmAnswer("false");
    }
    return () => {
      clearTimeout(timeInterval);
    };
  }, [countdown]);

  return (
    <main>
      <div className={styles.container}>
        {loading ? (
          <img
            src="https://uploads.toptal.io/blog/image/122376/toptal-blog-image-1489080120310-07bfc2c0ba7cd0aee3b6ba77f101f493.gif"
            alt="spin"
            className={styles.loading}
          />
        ) : (
          <RenderQuestion />
        )}
      </div>
    </main>
  );
}

export default App;