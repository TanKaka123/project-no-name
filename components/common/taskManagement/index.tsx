import React, { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { TaskToolbox } from './TaskToolbox';
import { TaskList } from './TaskList';
import { ModalNewTask } from './ModalNewTask';
import { mockTasks, Status, Task } from './type';
import { PageTitle } from '../PageTitle';

export const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'status'>('priority');
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All');
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const filteredAndSortedTasks = tasks
    .filter(task =>
      (filterStatus === 'All' || task.status === filterStatus) &&
      (task.name.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        const statusOrder = { 'To Do': 1, 'In Progress': 2, 'Completed': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
    });

  const handleAddOrUpdateTask = () => {
    if (editingTaskId) {
      setTasks(tasks.map(task => task.id === editingTaskId ? { ...task, ...newTask } as Task : task));
      setEditingTaskId(null);
    } else {
      const task: Task = {
        id: Date.now().toString(),
        name: newTask.name || '',
        description: newTask.description || '',
        priority: newTask.priority || 'Medium',
        estimatedTime: newTask.estimatedTime || 0,
        status: newTask.status || 'To Do',
      };
      setTasks([...tasks, task]);
    }
    setNewTask({});
    setIsOpen(false);
  };

  const handleDeleteTask = (id: string) => setTasks(tasks.filter(task => task.id !== id));
  const handleEditTask = (task: Task) => {
    setNewTask(task);
    setEditingTaskId(task.id);
    setIsOpen(true);
  };

  return (
    <Box p={5}>
      <Box mb={8}>
        <PageTitle content='Task Management'/>
      </Box>
      <VStack spacing={4} align="stretch">
        <TaskToolbox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onOpen={() => setIsOpen(true)}
        />
        <TaskList tasks={filteredAndSortedTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      </VStack>
      <ModalNewTask
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        task={newTask}
        setTask={setNewTask}
        onSubmit={handleAddOrUpdateTask}
        isEditing={!!editingTaskId}
      />
    </Box>
  );
};
