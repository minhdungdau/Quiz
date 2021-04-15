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
function App({score, setScore, timeTotal, setTimeTotal}) {

  const [question, setQuestion] = useState({});
  const [questionList,setQuestionList] = useState([])
  const [questionCount, setQuestionCount] = useState(1)

  const history = useHistory();

  var timeInterval

  function confirmAnswer(answer) {
    if (questionCount === 10) {
      clearTimeout(timeInterval)
      history.push("/end")
    }

    if (answer === "true") {
      setScore(score + 1);
    }
    randomQuestion(questionList)
    setQuestionCount(questionCount + 1)
  }

  function randomQuestion(list) {
    let randomNumberQuestion = Math.floor(Math.random() * list.length);
      setQuestion(list[randomNumberQuestion]);
      let cloneList = [...list]
      cloneList.splice(randomNumberQuestion,1)
      setQuestionList(cloneList)
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
                  {ele.slice(ele.length - 1).toUpperCase()}.{" "}
                  {question.answers?.[ele]}
                </div>
              );
          })}
        </div>
        <div className={styles.time}>30</div>
      </>
    );
  }
  
  useEffect(() => {
    async function fetchData() {
      let data = await getData();
      randomQuestion(data)
    } 
    fetchData();
    setScore(0)
  }, []);

useEffect(() => {
  timeInterval = setInterval(() => {
    setTimeTotal(timeTotal + 1)
  }, 1000);
},[])

  return (
    <main>
      <div className={styles.container}>
        <RenderQuestion />
      </div>
    </main>
  );
}

export default App;
