// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   FormControl,
//   Paper,
//   CircularProgress,
//   TextField, // Add TextField import
// } from "@mui/material";
// import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
// // import Lottie from "react-lottie";
// // import animationData from "../animations/typing.json";
// // import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";

// // Add the missing imports
// import axios from "axios";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import { toast } from "react-toastify"; // You need to have a toast library (e.g., react-toastify) and its styles imported.
// import { getSender, getSenderFull } from "../config/ChatLogics";

// const ENDPOINT = "http://localhost:5001"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
// var socket, selectedChatCompare;

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [istyping, setIsTyping] = useState(false);

//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     // animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//       setLoading(false);

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast.error("Failed to Load the Messages");
//     }
//   };

//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessage) {
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         setNewMessage("");
//         const { data } = await axios.post(
//           "/api/message",
//           {
//             content: newMessage,
//             chatId: selectedChat,
//           },
//           config
//         );
//         socket.emit("new message", data);
//         setMessages([...messages, data]);
//       } catch (error) {
//         toast.error("Failed to send the Message");
//       }
//     }
//   };

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     socket.emit("setup", user);
//     socket.on("connected", () => setSocketConnected(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//     selectedChatCompare = selectedChat;
//   }, [selectedChat]);

//   useEffect(() => {
//     socket.on("message received", (newMessageReceived) => {
//       if (
//         !selectedChatCompare ||
//         selectedChatCompare._id !== newMessageReceived.chat._id
//       ) {
//         if (!notification.includes(newMessageReceived)) {
//           setNotification([newMessageReceived, ...notification]);
//           setFetchAgain(!fetchAgain);
//         }
//       } else {
//         setMessages([...messages, newMessageReceived]);
//       }
//     });
//   });

//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Typography
//             variant="h3"
//             sx={{
//               padding: 3,
//               display: "flex",
//               justifyContent: { xs: "space-between", md: "flex" },
//               alignItems: "center",
//             }}
//           >
//             <IconButton
//               sx={{ display: { xs: "flex", md: "none" } }}
//               onClick={() => setSelectedChat("")}
//             >
//               <ArrowBackIcon />
//             </IconButton>
//             {messages && (
//               <>
//                 {selectedChat.isGroupChat ? (
//                   <>
//                     {selectedChat.chatName.toUpperCase()}
//                     <UpdateGroupChatModal
//                       fetchMessages={fetchMessages}
//                       fetchAgain={fetchAgain}
//                       setFetchAgain={setFetchAgain}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     {getSender(user, selectedChat.users)}
//                     <ProfileModal
//                       user={getSenderFull(user, selectedChat.users)}
//                     />
//                   </>
//                 )}
//               </>
//             )}
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "flex-end",
//               padding: 3,
//               background: "#E8E8E8",
//               width: "100%",
//               height: "100%",
//               borderRadius: "lg",
//               overflowY: "hidden",
//             }}
//           >
//             {loading ? (
//               <CircularProgress
//                 size={100}
//                 sx={{ alignSelf: "center", margin: "auto" }}
//               />
//             ) : (
//               <div className="messages">
//                 <ScrollableChat messages={messages} />
//               </div>
//             )}

//             <FormControl onKeyDown={sendMessage} required sx={{ marginTop: 3 }}>
//               {istyping ? (
//                 <div>
//                   {/* <Lottie
//                     options={defaultOptions}
//                     sx={{ marginBottom: 15, marginLeft: 0 }}
//                   /> */}
//                 </div>
//               ) : (
//                 <></>
//               )}
//               <TextField
//                 variant="filled"
//                 sx={{ background: "#E0E0E0" }}
//                 placeholder="Enter a message.."
//                 value={newMessage}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "100%",
//           }}
//         >
//           <Typography variant="h3" sx={{ paddingBottom: 3 }}>
//             Click on a user to start chatting
//           </Typography>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;
