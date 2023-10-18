import { Box, Paper } from '@mui/material';
import './styles.css';
import SingleChat from './SingleChat';
import { ChatState } from '../Context/ChatProvider';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Paper
      sx={{
        display: { xs: selectedChat ? 'flex' : 'none', md: 'flex' },
        alignItems: 'center',
        flexDirection: 'column',
        padding: 3,
        backgroundColor: 'white',
        width: { xs: '100%', md: '68%' },
        borderRadius: 'lg',
        borderWidth: '1px',
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Paper>
  );
};

export default Chatbox;
