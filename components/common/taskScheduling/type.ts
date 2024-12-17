export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done' | 'Expired';
  start: Date;
  end: Date;
}
