import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, VStack, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { Priority, Status, Task } from './type';

interface ModalNewTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Partial<Task>;
  setTask: React.Dispatch<React.SetStateAction<Partial<Task>>>;
  onSubmit: () => void;
  isEditing: boolean;
}

export const ModalNewTask: React.FC<ModalNewTaskProps> = ({ isOpen, onClose, task, setTask, onSubmit, isEditing }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{isEditing ? 'Edit Task' : 'Add New Task'}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={task.name || ''} onChange={(e) => setTask({ ...task, name: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input value={task.description || ''} onChange={(e) => setTask({ ...task, description: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Select value={task.priority || 'Medium'} onChange={(e) => setTask({ ...task, priority: e.target.value as Priority })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Estimated Time (minutes)</FormLabel>
            <Input type="number" value={task.estimatedTime || ''} onChange={(e) => setTask({ ...task, estimatedTime: parseInt(e.target.value) })} />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={task.status || 'To Do'} onChange={(e) => setTask({ ...task, status: e.target.value as Status })}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter gap={2}>
        <Button variant={'primary'} onClick={onSubmit}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
