import "../index.css";

const Button = ({ classname, value, onClick }) => {
  return (
    <button className={classname} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
