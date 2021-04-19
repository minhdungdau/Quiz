import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./components/AppPage/App";
import Start from "./components/Start/Start";
import End from "./components/End/End";
import {useState} from "react"; 
export default function Main() {
  const [score, setScore] = useState(0);
  const [timeTotal, setTimeTotal] = useState(0)
  const maxQuestion = 5
  const timePerQuestion = 5;
  return (
    <Router>
      <Switch>
        <Route exact path="/app">
          <App score={score} setScore={setScore} timeTotal={timeTotal} setTimeTotal={setTimeTotal} maxQuestion={maxQuestion} timePerQuestion={timePerQuestion} />
        </Route>
        <Route exact path="/end">
          <End score={score} timeTotal={timeTotal} maxQuestion={maxQuestion} />
        </Route>
        <Route exact path="/">
          <Start />
        </Route>
      </Switch>
    </Router>
  );
}
