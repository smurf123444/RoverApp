function MessageList({ messages }) {
    console.log(messages)
    return (
      <div 
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              <h4>From:</h4>
              <p>{message.sender_id}</p>
            </div>
            <div style={{ flex: 2 }}>
              <h3>Message:</h3>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default MessageList;
  