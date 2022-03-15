import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text}: </td>
      <td> {props.value} </td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  if (all >= 1) {
    const average = (props.good - props.bad) / all;
    const positive = (props.good / all) * 100;
    const percentage = positive + "%";
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={percentage} />
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <h3>Statistics</h3>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
