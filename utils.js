const catchError = async (next, callback, errorCallback) => {
  try {
    await callback();
  }
  catch (err) {
    if (errorCallback) {
      errorCallback(err);
    } else {
      next(err);
    }
  }
}

export default catchError;  
