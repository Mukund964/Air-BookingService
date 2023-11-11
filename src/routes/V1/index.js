const express = require('express');
const router = express.Router();

const {bookingController} = require('../../controllers/index');
router.post('/bookings',bookingController.create);
router.patch('/bookings/:id',bookingController.update);

module.exports = router;