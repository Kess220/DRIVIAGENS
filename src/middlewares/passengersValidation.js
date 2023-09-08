import Joi from "joi";

const passengerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  second_name: Joi.string().min(2).max(100).required(),
});

export default passengerSchema;
