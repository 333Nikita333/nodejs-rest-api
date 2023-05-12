const errorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};
class HttpError extends Error {
  constructor(status, message = errorMessages[status]) {
    super(message);
    this.status = status;
  }
}

module.exports = HttpError;
