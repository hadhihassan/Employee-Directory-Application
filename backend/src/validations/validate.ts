import { ObjectId } from "mongodb";
import { BadRequestError } from "../utils/error.ts";

export const validateObjectId = (id: string) => {
  if (!id) {
    throw BadRequestError(`id is required`);
  }
  if (!ObjectId.isValid(id)) {
    throw BadRequestError(`Invalid ID: ${id}`);
  }
  return new ObjectId(id);
};
