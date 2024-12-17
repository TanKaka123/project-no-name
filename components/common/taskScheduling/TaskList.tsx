import { Box, Heading, VStack } from "@chakra-ui/react";
import { Task } from "./type";
import { TaskItem } from "./TaskItem";

type TaskListProps = {         
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  return (
    <Box p={4} bg="gray.100" rounded="lg"       
>
      <Heading size="md" mb={4}>
        Tasks
      </Heading>
      <VStack overflowX="auto" gap={4} overflowY={'auto'} maxH="80vh">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </VStack>
    </Box>
  );
};
