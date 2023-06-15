const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();

/**
 * @swagger
 * /addresses:
 *   post:
 *     tags: [Locations]
 *     summary: Create a new address
 *     description: Create a new address in the system
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', addressController.createAddress);

/**
 * @swagger
 *  /addresses/{address_id}:
 *   put:
 *     tags: [Locations]
 *     summary: Update an address by ID
 *     description: Update an existing address by ID
 *     parameters:
 *       - in: path
 *         name: address_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the address to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:address_id', addressController.updateAddress);

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Operations with addresses
 * /addresses:
 *   get:
 *     tags: [Locations]
 *     summary: Get paginated addresses
 *     description: Retrieve a list of addresses with pagination
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
 *         description: The number of addresses per page
 *     responses:
 *       200:
 *         description: A paginated list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 addresses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Address'
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
router.get('/', addressController.getAllAddresses);

/**
 * @swagger
 *  /addresses/{address_id}:
 *   get:
 *     tags: [Locations]
 *     summary: Get address by ID
 *     description: Retrieve a single address by its ID
 *     parameters:
 *       - in: path
 *         name: address_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the address to retrieve
 *     responses:
 *       200:
 *         description: Address found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:address_id', addressController.getAddressById);

/**
 * @swagger
 * /addresses/street/{street}:
 *   get:
 *     tags: [Locations]
 *     summary: Get addresses by street name
 *     description: Retrieve a list of addresses by the street name
 *     parameters:
 *       - in: path
 *         name: street
 *         schema:
 *           type: string
 *         required: true
 *         description: Street name of the addresses to retrieve
 *     responses:
 *       200:
 *         description: A list of addresses found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       404:
 *         description: Addresses not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/street/:street', addressController.getAddressByStreet);

module.exports = router;
