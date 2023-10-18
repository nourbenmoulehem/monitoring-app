import { Button, Paper, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useToast } from '@mui/system';
import axios from 'axios';
import { ChatLoading } from './ChatLoading';
import { GroupChatModal } from './miscellaneous/GroupChatModal';
import { Box, Stack } from '@mui/system';
import { ChatState } from '../Context/ChatProvider';
import { getSender } from '../config/ChatLogics';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat', config);
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: 'Failed to Load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Paper
      sx={{
        display: { xs: selectedChat ? 'none' : 'flex', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        backgroundColor: 'white',
        width: { xs: '100%', md: '31%' },
        borderRadius: 'lg',
        borderWidth: '1px',
      }}
    >
      <Box
        sx={{
          paddingBottom: 3,
          paddingLeft: 3,
          fontSize: { xs: '28px', md: '30px' },
          fontFamily: 'Work sans',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">My Chats</Typography>
        <GroupChatModal>
          <Button
            sx={{
              display: 'flex',
              fontSize: { xs: '17px', md: '10px', lg: '17px' },
            }}
            endIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          backgroundColor: '#F8F8F8',
          width: '100%',
          height: '100%',
          borderRadius: 'lg',
          overflowY: 'hidden',
        }}
      >
        {chats ? (
          <Stack sx={{ overflowY: 'scroll' }}>
            {chats.map((chat) => (
              <Paper
                onClick={() => setSelectedChat(chat)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: selectedChat === chat ? '#38B2AC' : '#E8E8E8',
                  color: selectedChat === chat ? 'white' : 'black',
                  paddingX: 3,
                  paddingY: 2,
                  borderRadius: 'lg',
                }}
                key={chat._id}
              >
                <Typography>
                  {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                </Typography>
                {chat.latestMessage && (
                  <Typography variant="body2">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + '...'
                      : chat.latestMessage.content}
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Paper>
  );
};

export default MyChats;
