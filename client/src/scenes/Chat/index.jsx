import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Paper,
  Input,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  styled,
  Badge,
  Stack,
  TextField,
} from "@mui/material";
import { tokens } from "theme.js";
import SendIcon from "@mui/icons-material/Send";
import ForumIcon from "@mui/icons-material/Forum";
import { useSelector } from "react-redux";
// import { uniqBy } from "lodash";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function Chat() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const user = useSelector((state) => state.global.user);
  const actualUserId = user._id;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divUnderMessages = useRef();

  useEffect(() => {
    connectToWs();
  }, [selectedUserId]);

  function connectToWs() {
    const ws = new WebSocket("ws://localhost:4001");
    setWs(ws);
    console.log(selectedUserId);
    ws.addEventListener("message", handleMessage);
  }

  function showOnlinePeople(people) {
    const peopleConnected = [];

    for (const person of people) {
      const userId = person.userId;

      if (!peopleConnected.includes(userId)) {
        peopleConnected.push(userId);
      }
    }
    setOnlinePeople(peopleConnected);
  }

  const handleMessage = async (e) => {
    console.log("ahaya selected user fel handle message", selectedUserId);
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      } 
    }
  };

  const styles = {
    transparentScrollbar: {
      scrollbarWidth: "thin", // For Firefox
      scrollbarColor: "transparent transparent", // For Firefox
      "&::-webkit-scrollbar": {
        width: "8px", // Width of the scrollbar
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent", // Color of the thumb
        borderRadius: "4px", // Rounded corners of the thumb
      },
    },
  };

  const handleSubmit = (e) => {
    //sendMessage()
    e.preventDefault();

    console.log(
      "🚀 ~ file: index.jsx:128 ~ handleSubmit ~ selectedUserId:",
      selectedUserId
    );
    ws.send(
      JSON.stringify({
        message: {
          recipient: selectedUserId,
          text: newMessage,
        },
      })
    );

    
    setNewMessage("");

    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: actualUserId,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);

   
  };

  // useEffect(() => {
  //   const div = divUnderMessages.current;
  //   if (div) {
  //     div.scrollIntoView({behavior:'smooth', block:'end'});
  //   }
  // }, [messages]);

  // function selectedContact(userId) {
  //   setSelectedUserId(userId);
  //   console.log("🚀 ~ file: index.jsx:113 ~ selectedContact ~ userId:", userId)
  //   console.log("🚀 ~ file: index.jsx:113 ~ selectedContact ~ SelectedUserId:", selectedUserId)
  // }

  console.log("is the page being refreshed?");

  const onlinePeopleExcludingUser = onlinePeople.filter(
    (id) => id !== actualUserId
  );

  // const messagesWithoutDupes = uniqBy(messages, '_id');
  // console.log("🚀 ~ file: index.jsx:141 ~ Chat ~ messagesWithoutDupes:", messagesWithoutDupes)
  // console.log("ahaya selected user", selectedUserId);
  // console.log("🚀 ~ file: index.jsx:154 ~ Chat ~ messagesWithoutDupes:", messagesWithoutDupes)
  return (
    <Grid
      container
      sx={{
        height: "100%",
        flexDirection: "row",
        overflowX: "hidden",
        alignItems: "stretch",
      }}
    >
      <Grid
        item
        xs={4}
        component={Paper}
        sx={{ p: 2, height: "100%",  }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <ForumIcon />
          <Typography variant="h6" sx={{ color: "blue", fontWeight: "bold" }}>
            Online People
          </Typography>
        </Box>

        <List>
          {onlinePeopleExcludingUser.map((userId) => (
            <Box key={userId}>
              {" "}
              {/* Add key prop here */}
              <ListItem
                onClick={() => {
                  setSelectedUserId(userId);
                  console.log({ userId });
                }}
                key={userId}
                sx={{
                  display: "flex",
                  gap: "25px",
                  backgroundColor:
                    selectedUserId === userId
                      ? colors.blueAccent[900]
                      : "inherit",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt="Nour Sharp" src="/static/images/avatar/1.jpg">
                      {/* {" "}
                      {userId[0]}{" "} */}
                    </Avatar>
                  </StyledBadge>
                </Stack>
                {/* primary={userId} */}
                <ListItemText primary="Nour bnm" /> 
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Grid>
      <Grid
        item
        xs={8}
        component={Paper}
        backgroundColor={theme.palette.background.alt}
        sx={{
          p: 2,
          height: "100%",
          // bgcolor: colors.blueAccent[900],
          overflowX: "hidden",
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div
            style={{
              flex: 1,
              height: "100%",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!selectedUserId && (
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: colors.grey[700],
                  fontWeight: "bold",
                }}
              >
                &larr; Select a conversation
              </Typography>
            )}

            {!!selectedUserId && (
              <Box
                style={{
                  overflowX: "hidden",
                  flex: 1,
                  maxHeight: "calc(100% - 5px)",
                  ...styles.transparentScrollbar,
                }}
                sx={{ flex: 1, height: "100%", overflowY: "auto" }}
                
              >
                {messages.map((message) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        message.sender === actualUserId
                          ? "flex-start"
                          : "flex-end",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection:
                          message.sender === actualUserId
                            ? "row"
                            : "row-reverse",
                        alignItems: "center",
                      }}
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          ml: message.sender === actualUserId ? 1 : 0,
                          mr: message.sender === actualUserId ? 0 : 1,
                          backgroundColor:
                            message.sender === actualUserId
                              ? "primary.light"
                              : "secondary.light",
                          borderRadius:
                            message.sender === actualUserId
                              ? "20px 20px 20px 5px"
                              : "20px 20px 5px 20px",
                        }}
                      >
                        <Typography
                          // style={{
                          //   backgroundColor:
                          //     message.sender === actualUserId
                          //       ? colors.blueAccent[300]
                          //       : colors.blueAccent[800],
                          //   color: "white",
                          //   paddingRight: "15px",
                          //   marginBottom: "8px",
                          // }}
                        >
                          {message.sender === actualUserId ? "Me: " : ""}
                          {message.text} <br />
                          {/* sender:{message.sender} <br />
                          --------------------------------------------------------------- */}
                        </Typography>
                      </Paper>
                      {/* <div ref={divUnderMessages}></div> */}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </div>
          {!!selectedUserId && (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  type="string"
                  sx={{
                    width: "10px",
                    flex: 1,
                    bgcolor: "white",
                    borderRadius: "20px",
                    paddingLeft: "10px",
                    position: "relative",
                    bottom: 0,
                    zIndex: 1,
                    "& fieldset": { border: "none" },
                    "& .MuiInputBase-input": {
                      padding: "7px", // Adjust the input padding to align with the button
                    },
                  }}
                  size="small"
                  fullWidth
                  // variant="outlined"
                  InputProps={{
                    style: {
                      border: "none", // Set border to none
                    },
                  }}
                  // value={input}
                  placeholder="Write your message here"
                  onChange={(e) => setNewMessage(e.target.value)}
                  autoComplete="off"
                />

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#007BFF", // Change the background color
                    color: "white", // Change the text color
                    borderRadius: "20px", // Add border-radius
                    paddingLeft: "20px",
                    marginLeft: "8px", // Add some padding to the button
                    "&:hover": {
                      backgroundColor: "#0056b3", // Change the background color on hover
                    },
                  }}
                  startIcon={<SendIcon />}
                >
                  Send
                </Button>
              </div>
            </form>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Chat;