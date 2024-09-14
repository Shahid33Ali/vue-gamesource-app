const errorCodes = (code) => {
  let msg;
  switch (code) {
    case "auth/user-not-found":
      msg = "Oops, sorry user not found, check your email";
      break;
    case "auth/email-already-in-use":
      msg = "Oops, email already in use";
      break;
    case "auth/wrong-password":
      msg = "Oops, wrong password";
      break;
    case "auth/invalid-credential":
      msg = "Sorry, invalid credential";
      break;
    default:
      msg = "Sorry, try again";
  }
  return msg;
};
export default errorCodes;
