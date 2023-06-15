const express = require('express');
const zoneController = require('../controllers/zoneController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with entities for Locations
 * /{zoneId}:
 *   get:
 *     tags: [Locations]
 *     summary: Get specific zone
 *     description: Retrieve a specific zone by its ID
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the zone to retrieve
 *     responses:
 *       200:
 *         description: A zone
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Zone'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: zone not found
 *       500:
 *         description: Internal Server Error
 *
 * components:
 *   schemas:
 *     zoneDepartmentCountry:
 *       type: object
 *       properties:
 *         zone:
 *           $ref: '#/components/schemas/zone'
 *         department:
 *           $ref: '#/components/schemas/Department'
 *         country:
 *           $ref: '#/components/schemas/Country'
 *       required:
 *         - zone
 *         - department
 *         - country
 */

router.get('/:zone_id', zoneController.getZoneById);

module.exports = router;
