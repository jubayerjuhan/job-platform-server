
const errorMiddleware = (err, req, res, next) => {
  let errorMessage = err?.message || "Internal Server Error";
  const errorCode = err?.statusCode || 500;


  res?.status(errorCode).json({
    success: false,
    message: errorMessage,
  });
};

export default errorMiddleware;
