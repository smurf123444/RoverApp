import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

function MessageList({ messages }) {
  return (
    <Box sx={{ maxHeight: "600px", overflowY: "auto", p: 2 }}>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {messages.map((message, index) => (
          <ListItem key={index} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  From: {message.from_text}
                </Typography>
              }
              secondary={
                <Typography variant="body1">{message.message}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default MessageList;
