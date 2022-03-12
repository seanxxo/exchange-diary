const registUser = (id, pw) => true;

const isDuplicateId = (inputID, setJoinErrMsg) =>
  false ? setJoinErrMsg(`이미 가입된 email`) : null;

const login = (id, pw) => {
  let result = false;
  let errMsg = "";
  true ? (result = true) : (errMsg = "error because of ...");
  return { result, errMsg };
};

export { registUser, isDuplicateId, login };
