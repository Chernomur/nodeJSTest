module.exports = (e) => {
  if (e.code === 11000) {
    if(e.message.includes("email")){
      let message;
      message = "this email is already in use.";
      return ({code: 400, message});
    }
    let message = "duplicate key";
    return ({code: 400, message});
  }
  if (e.name === "ValidationError") {
    let message;
    if(e.message.includes("email")){
      message = "incorrect e-mail" ;
    }
    return({code: 400, message});
  }
  if (e.name === "CastError") {
    let message="cast error";
    return({code: 404, message});
  }
  let message="server error";
  return({code: 500, message});
}