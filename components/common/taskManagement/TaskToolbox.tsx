import React from 'react';
import { HStack, Input, Select, Button } from '@chakra-ui/react';
import { Status } from './type';

interface TaskToolboxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'priority' | 'status';
  setSortBy: (sort: 'priority' | 'status') => void;
  filterStatus: Status | 'All';
  setFilterStatus: (status: Status | 'All') => void;
  onOpen: () => void;
}

export const TaskToolbox: React.FC<TaskToolboxProps> = ({ searchTerm, setSearchTerm, sortBy, setSortBy, filterStatus, setFilterStatus, onOpen }) => (
  <HStack spacing={4}>
    <Button onClick={onOpen} variant={'primary'} w='fit-content'>Add Task</Button>
    <Input placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} w='fit-content'/>
    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'priority' | 'status')} w='fit-content'>
      <option value="priority">Sort by Priority</option>
      <option value="status">Sort by Status</option>
    </Select>
    <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as Status | 'All')} w='fit-content'>
      <option value="All">All Statuses</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </Select>
  </HStack>
);
