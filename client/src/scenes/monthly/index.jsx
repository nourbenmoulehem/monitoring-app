import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme, Modal, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { format } from "date-fns"; // Import the date-fns format function
import { useGetAllEventsQuery } from "state/api";
import axios from 'axios';

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false); // model to create event
  const [isModalEditOpen, setIsModalEditOpen] = useState(false); // model to update or delete event
  const [eventDate, setEventDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedeventTitle, setSelectedEventTitle] = useState("");
  const [initialEventsLoaded, setInitialEventsLoaded] = useState(false); // Track whether initial events are loaded

  const eventsQuery =  useGetAllEventsQuery()
  
  useEffect(() => {
    if (eventsQuery.isSuccess && !initialEventsLoaded) {
      console.log("🚀 ~ file: index.jsx:30 ~ useEffect ~ eventsQuery:", eventsQuery.data)
      // Map events data from the query to FullCalendar format
      const initialEvents = eventsQuery.data.map((event) => {
        const startDate = new Date(event.start);
        

        // const endDate = new Date(event.end);
        // if (isNaN(endDate.getTime())) {
        //   // Handle invalid date gracefully (e.g., skip this event)
        //   return null;
        // }
  
        return {
          id: event._id,
          title: event.title,
          start: format(startDate, "yyyy-MM-dd"),
          // end: format(endDate, "yyyy-MM-dd"),
        };
      }).filter((event) => event !== null); // Remove null entries (invalid dates)
      
  
      // Set the initial events in FullCalendar
      setCurrentEvents(initialEvents);
      setInitialEventsLoaded(true);
    }
  }, [eventsQuery.isSuccess, initialEventsLoaded]);
  

  const simplifiedEvents = currentEvents.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.start,
  }));
  console.log("🚀 ~ file: index.jsx:63 ~ simplifiedEvents ~ simplifiedEvents:", simplifiedEvents)
  console.log("🚀 ~ file: index.jsx:50 ~ currentEvents ~ currentEvents:", currentEvents)
  
  // const handleDateClick = (selected) => {
  //   const title = prompt("Please enter a new title for a meeting ;))");
  //   const calendarApi = selected.view.calendar;
  //   calendarApi.unselect();

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: `${selected.dateStr}-${title}`,
  //       title,
  //       start: selected.startStr,
  //       end: selected.endStr,
  //       allDay: selected.allDay,
  //     });
  //   }
  // };

  const handleDateClick = (selected) => {
    setEventDate(selected);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEventDate(null);
    setEventTitle("");
  };

  const handleModalSave = async () => {
    if (eventTitle && eventDate) {
      const calendarApi = eventDate.view.calendar;
      calendarApi.unselect();
  
      const newEvent = {
        id: `${eventDate.dateStr}-${eventTitle}`,
        title: eventTitle,
        start: eventDate.startStr,
        end: eventDate.endStr,

      };
      console.log("🚀 ~ file: index.jsx:105 ~ handleModalSave ~ newEvent:", newEvent)
  
      try {
        // Send the new event to the server
        const response = await axios.post('http://localhost:5001/events/create-event', newEvent);
  
        // Handle success
        console.log('Event saved:', response.data);
  
        // Add the event to the local calendar
        calendarApi.addEvent(newEvent);
  
        // Close the modal
        handleModalClose();
      } catch (error) {
        // Handle error
        console.error('Error saving event:', error);
      }
    }
  };
  ;
  

  const handleEventClick = (selected) => {
    console.log("🚀 ~ file: index.jsx:107 ~ handleEventClick ~ selected:", selected)
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the meeting '${selected.event.title}'`
    //   )
    // ) {
    //   selected.event.remove();
    // }
    setIsModalEditOpen(true);
    setSelectedEventTitle(selected.event.title)
  };

  return (
    <Box m="20px">
      <Header title="Calendrier" subtitle="" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                backgroundColor: colors.greenAccent[500],
                margin: "10px 0",
                borderRadius: "2px",
              }}
            >
              <ListItemText
                primary={event.title}
                secondary={
                  <Typography>
                    {new Date(event.start).toLocaleDateString()} - {new Date(event.end).toLocaleDateString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={simplifiedEvents}
          />
        </Box>
      </Box>

       {/* Event Title Modal */}
       <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="event-title-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme.palette.background.paper,
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            minWidth: "400px", // Adjust the width here
          }}
        >
          <Typography variant="h6">Enter Meeting Title</Typography>
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={handleModalClose} sx={{
              backgroundColor:  theme.palette.background.alt,
              color: theme.palette.secondary.light,
              
            }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalSave}
              sx={{ ml: 2, bgcolor: theme.palette.secondary.light, '&:hover': { bgcolor: theme.palette.primary.dark } }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* model to delete or update */}
      <Modal
        open={isModalEditOpen}
        onClose={handleModalClose}
        aria-labelledby="event-title-modal"
      >
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: theme.palette.background.paper,
      borderRadius: "5px",
      boxShadow: 24,
      p: 4,
      minWidth: "400px", // Adjust the width here
      mb: "3px",
    }}
  >
    <Typography variant="h6" sx={{
      mb: "1rem",
    }}>Edit Meeting Title</Typography>
    <TextField
      label="Event Title"
      variant="outlined"
      fullWidth
      value={selectedeventTitle}
      onChange={(e) => setEventTitle(e.target.value)}
    />
    <Box mt={3} display="flex" justifyContent="flex-end">
      <Button
        variant="outlined"
        onClick={handleModalClose}
        sx={{
          backgroundColor:  theme.palette.background.alt,
          color: theme.palette.secondary.light,
          
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          ml: 2,
          bgcolor: theme.palette.error.main, // Red color for Delete
          '&:hover': { bgcolor: theme.palette.error.dark },
        }}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        sx={{ ml: 2, bgcolor: theme.palette.secondary.light, '&:hover': { bgcolor: theme.palette.primary.dark } }}
      >
        Update
      </Button>
    </Box>
  </Box>
</Modal>

    </Box>
  );
};

export default Calendar;
