const { body, param, validationResult } = require("express-validator");

const stringHelper = require("../utils/string.helper");

const restaurantService = require("../services/restaurant.service");

/**
 * Validation chain
 */
const validate = (method) => {
  switch (method) {
    case "create_restaurant":
      return [
        body("name").notEmpty(),
        body("address").notEmpty(),
        body("city").notEmpty(),
        body("phoneNumber")
          .notEmpty()
          .isMobilePhone("any", { strictMode: true }),
        body("website").notEmpty(),
      ];

    case "update_restaurant":
      return [
        body("id").notEmpty(),
        body("name").notEmpty(),
        body("address").notEmpty(),
        body("city").notEmpty(),
        body("phoneNumber")
          .notEmpty()
          .isMobilePhone("any", { strictMode: true }),
        body("website").notEmpty(),
      ];

    case "delete_restaurant":
      return [param("id").notEmpty()];
  }
};

/**
 * Get restaurants
 */
const getRestaurants = async (req, res, next) => {
  try {
    let restaurants = await restaurantService.get();

    res.send(restaurants);
  } catch (e) {
    next(e);
  }
};

/**
 * Get restaurants by id
 */
const getRestaurantById = async (req, res, next) => {
  try {
    let restaurant = await restaurantService.getById(req.params.id);

    if (!restaurant) {
      return res.status(404).end();
    }

    res.send(restaurant);
  } catch (e) {
    next(e);
  }
};

/**
 * Get restaurants by code
 */
const getRestaurantByCode = async (req, res, next) => {
  try {
    let restaurant = await restaurantService.getByCode(req.params.code);

    if (!restaurant) {
      return res.status(404).end();
    }

    res.send(restaurant);
  } catch (e) {
    next(e);
  }
};

/**
 * Create restaurant
 */
const createRestaurant = async (req, res, next) => {
  try {
    // Extracts the validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const code = stringHelper.random(5);
    const { name, address, city, phoneNumber, website } = req.body;

    // Create restaurant
    await restaurantService.create({
      name,
      code,
      address,
      city,
      phoneNumber,
      website,
    });

    res.status(201).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Update restaurant
 */
const updateRestaurant = async (req, res, next) => {
  try {
    // Extracts the validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, address, city, phoneNumber, website } = req.body;

    // Update restaurant
    await restaurantService.update({
      id,
      name,
      address,
      city,
      phoneNumber,
      website,
    });

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Delete restaurant
 */
const deleteRestaurant = async (req, res, next) => {
  try {
    // Extracts the validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Delete restaurant
    await restaurantService.remove(req.params.id);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validate,
  getRestaurants,
  getRestaurantById,
  getRestaurantByCode,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
