import Task from '../models/task.model.js';
import Project from '../models/project.model.js';

export const createTask = async (data, user) => {
  const project = await Project.findById(data.project);

  if (!project) {
    throw new Error('Project not found');
  }

  if (
    user.role !== 'admin' &&
    project.createdBy.toString() !== user._id.toString()
  ) {
    throw new Error('Unauthorized');
  }

  const task = await Task.create(data);

  return task;
};

export const getTasks = async (query, user) => {
  const { page = 1, limit = 10, status, search } = query;

  const filter = {};

  if (status) filter.status = status;

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const tasks = await Task.find(filter)
    .populate('project', 'name')
    .populate('assignedTo', 'name email')
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return tasks;
};

export const updateTask = async (id, data, user) => {
  const task = await Task.findById(id).populate('project');

  if (!task) {
    throw new Error('Task not found');
  }

  if (
    user.role !== 'admin' &&
    task.project.createdBy.toString() !== user._id.toString()
  ) {
    throw new Error('Unauthorized');
  }

  Object.assign(task, data);
  await task.save();

  return task;
};

export const deleteTask = async (id, user) => {
  const task = await Task.findById(id).populate('project');

  if (!task) {
    throw new Error('Task not found');
  }

  if (
    user.role !== 'admin' &&
    task.project.createdBy.toString() !== user._id.toString()
  ) {
    throw new Error('Unauthorized');
  }

  await task.deleteOne();

  return true;
};