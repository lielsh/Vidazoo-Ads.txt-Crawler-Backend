const express = require('express');
const router = express.Router();

const DomainsController = require('../controllers/DomainsController');

router.get('/:domain', DomainsController.getData);

module.exports = router;