const { activities } = require('./models');

const addActivity = ({ name, content }) => {
  //Activity.create({name, content});
};

const findActivity = async (id) => {
  const activity = await activities.findOne({ where: { id: id } });
  return activity;
};

const updateActivity = async (activityInstance, newValues) => {
  const updatedActivity = await activities.update(newValues);
  return updatedActivity;
};

module.exports = { addActivity, findActivity, updateActivity };
