const { validationResult } = require('express-validator');
const {
  addActivity,
  findActivity,
  updateActivity,
  findAllActivities,
  destroyActivity,
} = require('../services/activities.service.js');

const getAllActivities = async (req, res) => {
  try {
    const activities = await findAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const getActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await findActivity(id);
    if (!activity) {
      return res.status(404).json({ errors: `Activity with id ${id} not found` });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const postActivities = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = await addActivity(req.body);
    res.status(200).json({ msg: 'Activity created succesfully', data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Server error: ${error.message}`);
  }
};

const putActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  const activityToUpdate = await findActivity(id);
  //console.log(activityToUpdate)
  if (activityToUpdate === null) {
    return res.status(404).json({ error: 'There is no activity with the given id' });
  }

  const { name, content } = req.body;

  try {
    const updatedActivity = await updateActivity(activityToUpdate, { name, content });
    res.status(200).json({ msg: `Activity succesfully updated`, activity: { name, content } });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const activitiy = await findActivity(id);

    if (!activitiy) {
      return res.status(404).json({ errors: `Activity with ${id} not found` });
    }
    await destroyActivity(id);
    res.status(200).json(activitiy);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

module.exports = { getAllActivities, getActivityById, postActivities, putActivity, deleteActivity };
