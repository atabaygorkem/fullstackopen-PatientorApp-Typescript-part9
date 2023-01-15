import { CoursePropType } from "../types";
import Part from "./Part";

const Content = ({ coursePartEntries }: CoursePropType): JSX.Element => {
  return (
    <div>
      {coursePartEntries.map((courseObj, index) => (
        <div key={index}>
          <Part coursePart={courseObj} />
        </div>
      ))}
    </div>
  );
};

export default Content;
