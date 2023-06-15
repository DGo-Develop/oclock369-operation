const express = require('express');
const identificationTypeController = require('../controllers/identificationTypeController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Client Identification
 *   description: Operations with identification for client
 * /identificationTypes:
 *   get:
 *     tags: [Client Identification]
 *     summary: Get paginated identification types
 *     description: Retrieve a list of identification types with pagination
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
 *         description: The number of identification types per page
 *     responses:
 *       200:
 *         description: A paginated list of identification types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     identificationTypes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/IdentificationType'
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
 *     IdentificationType:
 *       type: object
 *       properties:
 *         identification_type_id:
 *           type: string
 *         name:
 *           type: string
 *         country_id:
 *           type: string
 *       required:
 *         - identification_type_id
 *         - name
 *         - country_id
 */
router.get('/', identificationTypeController.getAllIdentificationTypes);

module.exports = router;
