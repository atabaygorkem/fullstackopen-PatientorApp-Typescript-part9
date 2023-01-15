import { CoursePart, CoursePropType } from "../types";

const Total = ({ coursePartEntries }: CoursePropType): JSX.Element => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {coursePartEntries.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;
