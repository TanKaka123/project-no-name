import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
// import "./styles.css";

const TaskScheduling = () => {
  const [calendarEvents, setCalendarEvents] = useState([
    {
      title: "Atlanta Monster",
      start: new Date("2019-04-04 00:00"),
      id: "99999998",
    },
    {
      title: "My Favorite Murder",
      start: new Date("2019-04-05 00:00"),
      id: "99999999",
    },
  ]);

  const [events] = useState([
    { title: "Event 1", id: "1" },
    { title: "Event 2", id: "2" },
    { title: "Event 3", id: "3" },
    { title: "Event 4", id: "4" },
    { title: "Event 5", id: "5" },
  ]);

  const [isEditForm, setIsEditForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const calendarComponentRef = useRef();

  // Add draggable behavior to external events
  useEffect(() => {
    const draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: (eventEl) => ({
        title: eventEl.getAttribute("title"),
        id: eventEl.getAttribute("data"),
      }),
    });
  }, []);

  const handleChange = (value: any) => {
    setFormTitle(value);
  };

  const saveForm = (arg: any) => {
    setCalendarEvents((prevEvents) => [
      ...prevEvents,
      {
        id: Date.now(),
        title: formTitle || "New Event",
        start: arg?.date || new Date(),
        allDay: arg?.allDay || false,
      },
    ]);
    setFormTitle("");
    setIsEditForm(false);
  };

  const handleDateClick = (arg: any) => {
    setIsEditForm(true);
  };

  const eventClick = (eventClick: any) => {
    Alert.fire({
      title: eventClick.event.title,
      html: `
        <div class="overflow-auto">
          <table class="table-auto">
            <tbody>
              <tr>
                <td class="font-semibold">Title</td>
                <td>${eventClick.event.title}</td>
              </tr>
              <tr>
                <td class="font-semibold">Start Time</td>
                <td>${eventClick.event.start}</td>
              </tr>
            </tbody>
          </table>
        </div>`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove Event",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.value) {
        eventClick.event.remove();
        Alert.fire("Deleted!", "Your event has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      {isEditForm && (
        <div className="p-4 bg-white rounded shadow-md">
          <input
            value={formTitle}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Event Title"
          />
          <button
            type="button"
            onClick={() => saveForm()}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Events Sidebar */}
        <div
          id="external-events"
          className="p-4 bg-white rounded shadow-md md:w-1/4"
        >
          <p className="text-center font-bold mb-4">Events</p>
          {events.map((event) => (
            <div
              key={event.id}
              className="fc-event cursor-pointer p-2 mb-2 text-white bg-blue-500 rounded shadow"
              title={event.title}
              data={event.id}
            >
              {event.title}
            </div>
          ))}
        </div>

        {/* FullCalendar */}
        <div className="bg-white rounded shadow-md md:w-3/4">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={calendarComponentRef}
            weekends={true}
            editable={true}
            droppable={true}
            events={calendarEvents}
            dateClick={handleDateClick}
            eventClick={eventClick}
          />
        </div>
      </div>
    </div>
  );
};


export default TaskScheduling;