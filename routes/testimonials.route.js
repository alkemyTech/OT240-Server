const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { postTestimonial, putTestimonial, deleteTestimonial } = require('../controllers/testimonials.controller.js');

const fieldValidations = [
  check('name', 'Name is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty(),
];

//@type POST
//@route /api/testimonials
//@desc creates a new testimonial. Checks 'name' and 'content' fields not to be empty;
//@access Private
router.post('/', fieldValidations, postTestimonial);

//@type PUT
//@route /api/testimonials
//@desc updates a testimonial for a given id param.
//@access Private
router.put('/:id', fieldValidations, putTestimonial);

router.delete('/:id', 
  //fieldValidations,
  deleteTestimonial
);


module.exports = router;
