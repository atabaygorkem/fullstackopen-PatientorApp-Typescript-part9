interface contentPropType {
  courseName: string;
}

const Header = ({ courseName }: contentPropType): JSX.Element => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

export default Header;
