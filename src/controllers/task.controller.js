import {createTask,updateTask,getTasks, deleteTask} from '../services/task.service.js';

export const create = async (req, res) => {
  try {
    const task = await createTask(req.body, req.user);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const tasks = await getTasks(req.query, req.user);

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const task = await updateTask(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteTask(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: 'Task deleted'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};