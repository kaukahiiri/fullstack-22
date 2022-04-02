const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part.name} tasks={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return <>{props.parts.reduce((sum, part) => sum + part.exercises, 0)}</>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.tasks}
    </p>
  );
};
const Course = (props) => {
  return (
    <div>
      <Header course={props.header} />
      <Content parts={props.parts} />

      {
        <p>
          Number of exercises <Total parts={props.parts} />
        </p>
      }
      <br />
    </div>
  );
};
export default Course;
