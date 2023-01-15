import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
          <small>
            <small>type: {coursePart.type}</small>
          </small>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>Project exercises: {coursePart.groupProjectCount}</p>
          <small>
            <small>type: {coursePart.type}</small>
          </small>
        </div>
      );
    case "submission":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
          <small>
            <small>type: {coursePart.type}</small>
          </small>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
          <p>Required skills: {coursePart.requirements.join(", ")}</p>
          <small>
            <small>type: {coursePart.type}</small>
          </small>
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;
