import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  MenuDivider,
  Paper,
  Tooltip,
  Typography,
  Input,
} from '@mui/material';
import { Bell as BellIcon, ChevronDown as ChevronDownIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { useToast } from '@mui/system';
import ChatLoading from '../ChatLoading';
import { Spinner } from '@mui/lab';
import ProfileModal from './ProfileModal';
import { Effect, NotificationBadge } from 'react-notification-badge';
import UserListItem from '../userAvatar/UserListItem';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';

function SideDrawer() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '100%',
          padding: '5px 10px',
          borderWidth: '5px',
        }}
      >
        <Tooltip title="Search Users to chat" arrow placement="bottom-end">
          <Button variant="text" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Typography sx={{ display: { xs: 'none', md: 'flex' }, paddingX: 4 }}>Search User</Typography>
          </Button>
        </Tooltip>
        <Typography variant="h3" fontFamily="Work sans">
          Talk-A-Tive
        </Typography>
        <div>
          <Menu>
            <MenuButton sx={{ padding: 1 }}>
              <NotificationBadge count={notification.length} effect={Effect.SCALE} />
              <BellIcon fontSize="large" sx={{ margin: 1 }} />
            </MenuButton>
            <MenuList sx={{ paddingLeft: 2 }}>
              {!notification.length && 'No New Messages'}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} sx={{ backgroundColor: 'white' }} endIcon={<ChevronDownIcon />}>
              <Avatar
                sx={{ cursor: 'pointer' }}
                size="small"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Paper>

      <Drawer placement="left" onClose={onClose} open={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader sx={{ borderBottom: '1px' }}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box sx={{ display: 'flex', paddingBottom: 2 }}>
              <Input
                placeholder="Search by name or email"
                sx={{ marginRight: 2 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner sx={{ marginLeft: 'auto' }} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
