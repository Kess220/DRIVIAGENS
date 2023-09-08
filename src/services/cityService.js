import * as CityRepository from "../repository/cityRepository.js";
import citySchema from "../validation/citySchema.js";
import HttpStatus from "http-status";

const cityRepository = new CityRepository();

async function createCityService(req, res) {
  const { error, value } = citySchema.validate(req.body);

  if (error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  const cityName = value.name;

  try {
    const newCity = await cityRepository.createCity(cityName);
    res.status(HttpStatus.CREATED).json(newCity);
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({ error: error.message });
  }
}

async function getAllCitiesService(req, res) {
  try {
    const cities = await cityRepository.getAllCities();
    res.status(HttpStatus.OK).json(cities);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

export { createCityService as createCity, getAllCitiesService as getAllCities };
