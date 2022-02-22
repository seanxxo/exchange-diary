const registUser = (id, pw) => true;

const isDuplicateId = (inputID, setJoinErrorMessage) =>
  false ? setJoinErrorMessage(`이미 가입된 email`) : null;

const login = (id, pw) => {
  let result = false;
  let errMsg = "";
  false ? (result = true) : (errMsg = "error because of ...");
  return { result, errMsg };
};

export { registUser, isDuplicateId, login };
