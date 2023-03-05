const Task = require('../Model/noteModel');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    status: 'success',
    results: tasks.length,
    tasks,
  });
};

const getTask = async (req, res) => {
  const _id = req.params.id;
  const task = await Task.findById(_id);

  if (!task) {
    return res.send(`There Is No Task With That: ${_id} ID`);
  }

  res.status(200).json({
    status: 'success',
    task,
  });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: 'success',
    task,
  });
};

const updateTask = async (req, res) => {
  const _id = req.params.id;

  const task = await Task.findOneAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).send(`There Is No Task With That Id: ${_id}`);
  }

  res.status(200).json({
    status: 'success',
    task,
  });
};

const deleteTask = async (req, res) => {
  const _id = req.params.id;
  const task = await Task.findOneAndDelete(_id);

  if (!task) {
    return res.status(404).send(`There Is No Id With This ${_id}`);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
