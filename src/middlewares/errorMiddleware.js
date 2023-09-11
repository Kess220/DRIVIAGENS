import HttpStatus from "http-status";

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ error: "Internal Server Error" });
}

export default errorHandler;
