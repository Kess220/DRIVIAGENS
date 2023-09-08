import Joi from "joi";

const citySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

export default citySchema;
