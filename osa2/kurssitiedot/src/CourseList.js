import Course from "./Course.js";

// As an exercise, I wanted to make this as it's own module too!

const CourseList = (props) => {
  return (
    <div>
      // all courses are read to their own array sent to Course component for
      further handling - using map
      {props.courses.map((course) => (
        <Course key={course.id} parts={course.parts} header={course.name} />
      ))}
    </div>
  );
};
export default CourseList;
