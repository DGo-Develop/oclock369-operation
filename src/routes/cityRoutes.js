const express = require('express');
const cityController = require('../controllers/cityController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with entities for Locations
 * /cities:
 *   get:
 *     tags: [Locations]
 *     summary: Get paginated cities
 *     description: Retrieve a list of cities with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of cities per page
 *     responses:
 *       200:
 *         description: A paginated list of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     cities:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/City'
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalCount:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       properties:
 *         city_id:
 *           type: string
 *         name:
 *           type: string
 *         country_id:
 *           type: string
 *         department_id:
 *           type: string
 *         code_dane:
 *           type: string
 *         status:
 *           type: boolean
 *       required:
 *         - city_id
 *         - name
 *         - country_id
 *         - department_id
 *         - status
 */
router.get('/', cityController.getAllCities);

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with entities for Locations
 * /cities/{cityId}:
 *   get:
 *     tags: [Locations]
 *     summary: Get specific city along with its department and country
 *     description: Retrieve a specific city by its ID, with associated department and country data
 *     parameters:
 *       - in: path
 *         name: cityId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the city to retrieve
 *     responses:
 *       200:
 *         description: A city with its department and country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/City'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: City not found
 *       500:
 *         description: Internal Server Error
 *
 * components:
 *   schemas:
 *     CityDepartmentCountry:
 *       type: object
 *       properties:
 *         city:
 *           $ref: '#/components/schemas/City'
 *         department:
 *           $ref: '#/components/schemas/Department'
 *         country:
 *           $ref: '#/components/schemas/Country'
 *       required:
 *         - city
 *         - department
 *         - country
 */
router.get('/:cityId', cityController.getCityWithDepartmentAndCountry);

module.exports = router;
