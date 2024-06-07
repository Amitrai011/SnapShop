import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(404)
      .json({ message: `Invalid ObjectId of:  ${req.params.id}` });
  }
  next();
}

export default checkObjectId;
