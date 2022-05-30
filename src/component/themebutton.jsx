import "../index.css";

const Themebutton = ({ classname, value, onClick }) => {
  return (
    <button className={classname} onClick={onClick}>
      {value}
    </button>
  );
};

export default Themebutton;
