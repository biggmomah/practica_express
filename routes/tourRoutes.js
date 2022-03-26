const express = require('express')
const tourController= require('./../controller/tourController')

const router = express.Router()
// Conseguimos el ID mediante la ruta y el parametro ingresado desde el cliente y lo mostramos por consola
router.param('id', tourController.checkID)
router
    .route('/')
    .get(tourController.getTours)
    .post(tourController.createTour)

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)

module.exports= router;