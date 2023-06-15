const express = require('express');
const countryController = require('../controllers/countryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with countries
 * /countries:
 *   get:
 *     tags: [Locations]
 *     summary: Get paginated countries
 *     description: Retrieve a list of countries with pagination
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
 *         description: The number of countries per page
 *     responses:
 *       200:
 *         description: A paginated list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     countries:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Country'
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
 *     Country:
 *       type: object
 *       properties:
 *         country_id:
 *           type: string
 *         name:
 *           type: string
 *         status:
 *           type: boolean
 *       required:
 *         - country_id
 *         - name
 *         - status
 */
router.get('/', countryController.getAllCountries);

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with entities for Locations
 * /countries/{countryId}:
 *   get:
 *     tags: [Locations]
 *     summary: Get specific department along with its country and country
 *     description: Retrieve a specific department by its ID, with associated country and country data
 *     parameters:
 *       - in: path
 *         name: countryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the department to retrieve
 *     responses:
 *       200:
 *         description: A department with its country and country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Country'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: department not found
 *       500:
 *         description: Internal Server Error
 *
 */
router.get('/:countryId', countryController.getCountry);

module.exports = router;
