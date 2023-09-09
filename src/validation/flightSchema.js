import Joi from "joi";

const createFlightSchema = Joi.object({
  origin: Joi.number().integer().min(1).required(),
  destination: Joi.number().integer().min(1).required(),
  date: Joi.string()
    .pattern(new RegExp(/^\d{2}-\d{2}-\d{4}$/))
    .required(),
});

export { createFlightSchema };
