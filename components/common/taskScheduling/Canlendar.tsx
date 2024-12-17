import { Box, Heading, Badge, Text } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { Task } from "./type";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import React from "react";

interface CalendarProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
}

moment.locale('en-GB');
const localizer = momentLocalizer(moment);



const CustomEvent: React.FC<{ event: Task }> = ({ event }) => {
  return (
    <Box
      bg="white"
      shadow="md"
      rounded="lg"
      p={2}
      borderLeftWidth="4px"
      borderLeftColor={
        event.status === 'Todo'
          ? 'blue.400'
          : event.status === 'In Progress'
          ? 'yellow.400'
          : event.status === 'Done'
          ? 'green.400'
          : 'red.400'
      }
    >
      <Heading size="sm">{event.title}</Heading>
      <Text fontSize="xs" color="gray.600">{event.description}</Text>
      <Badge
        colorScheme={
          event.status === 'Todo'
            ? 'blue'
            : event.status === 'In Progress'
            ? 'yellow'
            : event.status === 'Done'
            ? 'green'
            : 'red'
        }
        mt={1}
      >
        {event.status}
      </Badge>
    </Box>
  );
};


export const CalendarComponent: React.FC<CalendarProps> = ({ tasks, onTaskUpdate }) => {
  const [visibleStartDate, setVisibleStartDate] = React.useState(new Date()); // Track visible start date
  const [currentView, setCurrentView] = React.useState<View>("week");

  // Update visible start date when navigation or view changes
  const handleNavigate = (date: Date) => {
    setVisibleStartDate(date);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };
    
    const [, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item: Task, monitor) => {
          const offset = monitor.getSourceClientOffset();
          if (offset) {
            const calendarElement = document.querySelector('.rbc-calendar');
            if (calendarElement) {
              const rect = calendarElement.getBoundingClientRect();
              const x = offset.x - rect.left;
              const y = offset.y - rect.top;
    
              // Get the total width and height of the calendar grid
              const totalWidth = rect.width;
              const totalHeight = rect.height;
    
              // Calculate the corresponding date and time
              const daysInView = currentView === "week" ? 7 : 1; // Week view or day view
              const hoursInDay = 24;
      
              const dayWidth = totalWidth / daysInView; // Width of a single day column
              const hourHeight = totalHeight / hoursInDay; // Height of a single hour slot
      
              const dayIndex = Math.floor(x / dayWidth); // Determine which day was targeted
              const hourIndex = Math.floor(y / hourHeight); // Determine which hour was targeted
              console.log({visibleStartDate})
              // Dynamically calculate the start time
              const start = moment(visibleStartDate)
                .startOf(currentView === "week" ? "week" : "day") // Adjust based on view
                .add(dayIndex, "days")
                .add(hourIndex, "hours")
                .toDate();
    
              const end = moment(start).add(1, 'hours').toDate(); // Default 1-hour duration
    
              const updatedTask = { ...item, start, end };
              onTaskUpdate(updatedTask);
            }
          }
        },
      }));

  return (
    <div ref={drop} className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={tasks}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        components={{
          event: CustomEvent, // Use the custom event component
        }}
        onView={handleViewChange} // Track view changes
        onNavigate={handleNavigate} 
      />
    </div>
  );
};
