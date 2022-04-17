import { useState } from "react";

const Form = ({ title, handleSubmit, observer, children }) => {
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
      <input type="submit" value={title} />
    </form>
  );
};

const Input = ({ label, name, type, hint }) => {
  return (
    <label>
      <div className="label">{label}</div>
      <div className="hint">{hint}</div>
      <input name={name} type={type}></input>
    </label>
  );
};

const EmailIdInput = () => {
  return (
    <Input label="아이디" name="id" type="email" hint="example@email.com" />
  );
};

const PasswordInput = () => {
  return <Input label="비밀번호" name="pw" type="password" hint="n자 이상" />;
};

export { Form, Input, EmailIdInput, PasswordInput };
