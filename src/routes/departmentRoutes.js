const express = require('express');
const departmentController = require('../controllers/departmentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with departments
 * /departments:
 *   get:
 *     tags: [Locations]
 *     summary: Get paginated departments
 *     description: Retrieve a list of departments with pagination
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
 *         description: The number of departments per page
 *     responses:
 *       200:
 *         description: A paginated list of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 departments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Department'
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalCount:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 */
router.get('/', departmentController.getAllDepartments);

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with entities for Locations
 * /departments/{countryId}:
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
router.get('/:departmentID', departmentController.getDepartment);

module.exports = router;
