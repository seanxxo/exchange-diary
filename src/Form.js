import { useState } from "react";

const Form = ({ handleSubmit, observer, children }) => {
  const [values, setValues] = useState({});
  if (observer) observer(values);

  const handleChange = (e) => {
    const tmpValues = { ...values };
    tmpValues[e.target.name] = e.target.value;
    setValues(tmpValues);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
      }}
      onChange={handleChange}
    >
      {children}
      <input type="submit" value="제출"></input>
    </form>
  );
};

const Input = ({ label, name, type }) => {
  return (
    <label>
      {label}
      <input name={name} type={type}></input>
    </label>
  );
};

export { Form, Input };
