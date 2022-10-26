const errorMap = {
    MISSING_PROP: 400,
    INVALID_PROP: 400,
  };
  
  const mapError = (type) => errorMap[type] || 500;
  
  module.exports = mapError;