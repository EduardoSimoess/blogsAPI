const errorMap = {
    MISSING_PROP: 400,
    INVALID_PROP: 400,
    USER_EXISTS: 409,
    MISSING_USER: 404,
    INVALID_USER: 401,
    POST_DOES_NOT_EXIST: 404,
  };
  
  const mapError = (type) => errorMap[type] || 500;
  
  module.exports = mapError;