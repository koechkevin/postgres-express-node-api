const validationErrorHandler = (req, res, errors, status) => {
  const error = errors.map(each => ({
    name: each.param,
    message: each.msg
  }));
  return res.status(status).json({
    errors: error
  });
};

export default { validationErrorHandler };
