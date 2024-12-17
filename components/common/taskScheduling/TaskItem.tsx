import { Box, Heading, Badge, Text } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { FaGripVertical } from "react-icons/fa";
import { Task } from "./type";

export const TaskItem = ({task}:{task: Task}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: task,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
    
    return  (
        <Box
        key={task.id}
        ref={drag} // Attach drag ref to the task container
        bg="white"
        shadow="md"
        rounded="lg"
        p={4}
        minW="280px"
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      >
        <Box display="flex" alignItems="center">
          <FaGripVertical size={20} style={{ cursor: 'grab', marginRight: '10px' }} /> {/* Drag handle icon */}
          <Box>
            <Heading size="sm" mb={2}>
              {task.title}
            </Heading>
            <Text fontSize="sm" color="gray.600">
              {task.description}
            </Text>
            <Badge
              colorScheme={
                task.status === "Todo"
                  ? "blue"
                  : task.status === "In Progress"
                  ? "yellow"
                  : task.status === "Done"
                  ? "green"
                  : "red"
              }
              mt={2}
            >
              {task.status}
            </Badge>
            <Text fontSize="sm" mt={2}>
              Start: {task.start.toLocaleString()}
            </Text>
            <Text fontSize="sm">End: {task.end.toLocaleString()}</Text>
          </Box>
        </Box>
      </Box>
    )
}
