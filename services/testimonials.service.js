const { Testimonial } = require('../models');

const addTestimonial = async (testimonialData) => {
  const newTestimonial = await Testimonial.create({ ...testimonialData });
  return newTestimonial;
};

const findTestimonial = async (id) => {
  const testimonialToUpdate = await Testimonial.findByPk(id);
  return testimonialToUpdate;
};

const findTestimonialsAll = async () => {
  const testimonials = await Testimonial.findAll();
  return testimonials
};

const updateTestimonial = async (testimonialInstance, newValues) => {
  const updatedTestimonial = await testimonialInstance.update(newValues);
  return updatedTestimonial;
};

const destroyTestimonial = async (id) => {
  await Testimonial.destroy({ where: { id } });  
};

module.exports = {
  findTestimonial,
  findTestimonialsAll,
  updateTestimonial,
  addTestimonial,
  destroyTestimonial
};
