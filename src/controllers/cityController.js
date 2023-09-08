import * as CityRepository from "../repository/cityRepository.js";
import Joi from "joi";
import HttpStatus from "http-status";

const createCitySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

async function createCityController(req, res) {
  const { error, value } = createCitySchema.validate(req.body);

  if (error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const cityName = value.name;

  try {
    const existingCity = await CityRepository.getCityByName(cityName);
    if (existingCity) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ error: "Cidade já existe." });
    }

    const newCity = await CityRepository.createCity(cityName);
    res.status(HttpStatus.CREATED).json(newCity);
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({ error: error.message });
  }
}

async function getAllCitiesController(req, res) {
  try {
    const cities = await CityRepository.getAllCities();
    res.status(HttpStatus.OK).json(cities);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

export {
  createCityController as createCity,
  getAllCitiesController as getAllCities,
};
