const express = require('express');
const router = express.Router();

const {bookingController} = require('../../controllers/index');
router.get('/info',(req,res)=>{
    res.send("From router");
})
router.post('/bookings',bookingController.create);
router.patch('/bookings/:id',bookingController.update);
module.exports = router;