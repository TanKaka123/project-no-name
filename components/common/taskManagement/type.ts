export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'To Do' | 'In Progress' | 'Completed';
export interface Task {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  estimatedTime: number; // in minutes
  status: Status;
}

export const mockTasks: Task[] = [
    {
      id: '1',
      name: 'Create project proposal',
      description: 'Draft a detailed project ',
      priority: 'High',
      estimatedTime: 120,
      status: 'To Do',
    },
    {
      id: '2',
      name: 'Review code changes',
      description: 'Review and approve pull requests for the latest feature',
      priority: 'Medium',
      estimatedTime: 60,
      status: 'In Progress',
    },
    {
      id: '3',
      name: 'Update documentation',
      description: 'Update the user manual with the latest changes Update the user manual with the latest changes',
      priority: 'Low',
      estimatedTime: 90,
      status: 'Completed',
    },
    // Add more mock tasks as needed
  ];
