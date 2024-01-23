function ErrorHandler(controllerFunction){
    return async (req, res, next) => {
        try {
          await Promise.resolve(controllerFunction(req, res));
        } catch (error) {
          res.setHeader('Content-type', 'application/json')
          res.end(JSON.stringify({errMessage: error.toString()}))
          // next(error);
        }
      };
}


export {ErrorHandler}