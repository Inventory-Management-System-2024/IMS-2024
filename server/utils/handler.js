function ErrorHandler(controllerFunction){
    return async (req, res, next) => {
        try {
          await Promise.resolve(controllerFunction(req, res));
        } catch (error) {
          next(error);
        }
      };
}


export {ErrorHandler}