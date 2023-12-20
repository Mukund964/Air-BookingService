const express = require('express');
const router = express.Router();

const {bookingController} = require('../../controllers/index');
router.post('/bookings',bookingController.create);
router.patch('/bookings/:id',bookingController.update);
router.post('/publish',bookingController.sendMessageToQueue);

module.exports = router;