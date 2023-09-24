import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { tokens } from "theme.js";
import SendIcon from "@mui/icons-material/Send";
import ForumIcon from "@mui/icons-material/Forum";
import { useSelector } from "react-redux";

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

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function Chat() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const user = useSelector((state) => state.global.user);
  const actualUserId = user._id;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4001");
    setWs(ws);
    ws.addEventListener("message", handleMessage); // you're listening for the "message" event, which is triggered when the WebSocket server sends a message to the client.
  }, []);

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

  function handleMessage(e) {
    const messageData = JSON.parse(e.data);
    console.log(e, messageData)
    console.log("🚀 ~ file: index.jsx:92 ~ handleMessage ~ e:", e)
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ('text' in messageData) {
      setMessages((prev) => [...prev, { ...messageData }]); // isOur: false means incoming message from the other part (the other user)
    }
  }

  function selectedContact(userId) {
    setSelectedUserId(userId);
  }

  const onlinePeopleExcludingUser = onlinePeople.filter(
    (id) => id !== actualUserId
  );

  const handleSubmit = (e) => {
    //sendMessage()
    e.preventDefault();
    ws.send(
      JSON.stringify({
        message: {
          recipient: selectedUserId,
          text: newMessage,
        },
      })
    );
    setNewMessage("");
    console.log(
      "🚀 ~ file: index.jsx:121 ~ handleSubmit ~ newMessage:",
      newMessage
    );
    setMessages(prev => ([...prev,{
      text: newMessage,
      sender: actualUserId,
      recipient: selectedUserId,
      _id: Date.now(),
    }]));
    console.log(
      "🚀 ~ file: index.jsx:122 ~ handleSubmit ~ messages:",
      messages
    );
  };

  function uniqBy(array, iteratee) {
    const seen = new Map();
    const result = [];
  
    for (const item of array) {
      const key = typeof iteratee === 'function' ? iteratee(item) : item[iteratee];
  
      if (!seen.has(key)) {
        seen.set(key, true);
        result.push(item);
      }
    }
  
    return result;
  }
  

  // const messagesWithoutDupes = uniqBy(messages, 'id');
  // console.log("🚀 ~ file: index.jsx:154 ~ Chat ~ messagesWithoutDupes:", messagesWithoutDupes)
  return (
    <Grid container sx={{ height: "100%", flexDirection: "row" }}>
      <Grid
        item
        xs={4}
        component={Paper}
        sx={{ p: 2, height: "100%", bgcolor: colors.primary[800] }}
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
                onClick={() => selectedContact(userId)}
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
                      {" "}
                      {userId[0]}{" "}
                    </Avatar>
                  </StyledBadge>
                </Stack>
                <ListItemText primary={userId} />
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
        sx={{ p: 2, height: "100%", bgcolor: colors.blueAccent[900] }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1 }}>
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
              <Box>
                {messages.map(message => (
                  <Typography> {message.text} </Typography>
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
                <Input
                  type="string"
                  sx={{
                    flex: 1,
                    bgcolor: "white",
                    borderRadius: "20px",
                    paddingLeft: "10px",
                    border: "none",
                    "&:focus": {
                      border: "none",
                    },
                  }}
                  placeholder="Write your message here"
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  startIcon={<SendIcon />}
                />
              </div>
            </form>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Chat;
