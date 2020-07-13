// const isPasswordValid = (password) => {
//   return true || false;
// };

// module.exports = {
//   password: isPasswordValid
// };




// Rename to errorHandler
module.exports = (err) => {
  if (err.code === 11000) {
    if (err.message.includes("email")) {
      return ({ code: 400, message: "this email is already in use." });
    }
    return ({ code: 400, message: "duplicate key" });
  }

  if (err.name === "ValidationError") {
    let message;
    if (err.message.includes("email")) {
      message = "incorrect e-mail";
    }
    return ({ code: 400, message });
  }

  if (err.name === "CastError") {
    return ({ code: 404, message: "cast error" });
  }

  return ({ code: 500, message: "server error" });
}