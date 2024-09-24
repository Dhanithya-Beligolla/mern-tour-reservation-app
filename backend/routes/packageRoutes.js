const express = require('express');
const { getPackages, createPackage,getPackageById } = require('../controller/packageController.js');
const router = express.Router();

router.get('/', getPackages);
router.post('/', createPackage);
router.get('/:id', getPackageById);  // GET a package by its ID

module.exports = router;
