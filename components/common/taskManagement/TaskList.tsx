import React from 'react';
import { GridItem , Text, Button, Stack, Grid, Box } from '@chakra-ui/react';
import { Task } from './type';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => (
  <Grid templateColumns="repeat(4, 1fr)" gap={4}>
    {tasks.map(task => (
      <GridItem   key={task.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="sm">
        <Stack spacing={2}>
          <Text fontSize="lg" fontWeight="bold" color="blue" isTruncated noOfLines={1}>
            {task.name}
          </Text>
          <Box
              css={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: '2'
              }}
              height="3em"
            >            
            <strong>Description:</strong> 
            {task.description}
            </Box>
            <Text>
            <strong>Priority:</strong> {task.priority}
          </Text>
          <Text>
            <strong>Estimated Time:</strong> {task.estimatedTime} min
          </Text>
          <Text>
            <strong>Status:</strong> {task.status}
          </Text>
          <Stack direction="row" spacing={2} mt={4}>
            <Button onClick={() => onEdit(task)} variant={'outline'}>Edit</Button>
            <Button onClick={() => onDelete(task.id)} colorScheme="red">Delete</Button>
          </Stack>
        </Stack>
      </GridItem>
    ))}
  </Grid>
);
