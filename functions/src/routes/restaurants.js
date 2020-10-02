const express = require("express");

const { Role } = require("../constants/role");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const restaurantController = require("../controllers/restaurant.controller");

var router = express.Router();

/**
 * GET - Restaurants
 */
router.get(
  "/",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  restaurantController.getRestaurants
);

/**
 * GET - Restaurants by id
 */
router.get(
  "/id/:id",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  restaurantController.getRestaurantById
);

/**
 * GET - Restaurants by code
 */
router.get(
  "/code/:code",
  authentication,
  restaurantController.getRestaurantByCode
);

/**
 * POST - Create new restaurant
 */
router.post(
  "/",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  restaurantController.validate("create_restaurant"),
  restaurantController.createRestaurant
);

/**
 * PUT - Create new restaurant
 */
router.put(
  "/",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  restaurantController.validate("update_restaurant"),
  restaurantController.updateRestaurant
);

/**
 * DELETE - Restaurant
 */
router.delete(
  "/:id",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  restaurantController.validate("delete_restaurant"),
  restaurantController.deleteRestaurant
);

module.exports = router;
