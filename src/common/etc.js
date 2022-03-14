const SoftAlert = ({ message }) => {
  return message ? <div>{message}</div> : null;
};

const Button = ({ label, handleClick }) => {
  return (
    <button onClick={handleClick} type="button">
      {label}
    </button>
  );
};

export { SoftAlert, Button };
