export const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: task,
});

export const markTaskAsCompleted = (taskId) => ({
  type: 'MARK_TASK_AS_COMPLETED',
  payload: taskId,
});

export const editTask = (task) => ({
  type: 'EDIT_TASK',
  payload: task,
});