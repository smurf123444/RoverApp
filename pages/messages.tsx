import React, { useState, useEffect } from 'react';
import {Button, Box, ButtonGroup, Grid, Typography, Stack, Divider, TextField, Container} from '@mui/material';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import { useRouter } from 'next/router';
import MessageList from '../components/Messages';
import TopNav from '../components/nav/TopNav';
import BottomNav from '../components/nav/BottomNav';

let username = '';
const Messages = () => {
    const [toUser, setToUser] = useState('');
    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

useEffect(() => {
        // get the token from cookie
        const tokenCall = getCookie('Token');

        const userName = getCookie('Username')
        // check if the token is valid
        const handleAuth = async () => {
            try {
                const response = await axios.post('http://192.168.4.45:3000/api/activeToken', {
                    token: tokenCall
                });
                if (response.data.message === 'Successfully Authenticated') {
                    setIsLoading(false);
                }
            } catch (error) {
                router.push('/login');
                console.log("Couldnt authenticate....");
                return false;
            }
        }

        handleAuth();

        // get user info
        const handleInfo = async () => {
            try {
                const response = await axios.post('http://192.168.4.45:3000/api/userInfo', {
                    token: tokenCall,
                    username: userName
                });
               // setUserName(response.data.data.ID.toString());
                return response.data.data;
            } catch (error) {
                return false;
            }
        }
        handleInfo();

        // handle message recieve


    }, []); // empty dependency array to run the effect only once on mount

useEffect(() => {
     username = getCookie('Username')
    const handleMessageRecieve = async () => {
        try {
            const response = await axios.put<any[]>('http://192.168.4.45:3000/api/messageReceive/', {
                toUser: username,
            });
            setMessages(response.data);
         //   console.log(response.data);
        } catch (error) {
            console.error(error);
            console.log("Couldn't receive message....");
        }
    }
    handleMessageRecieve();
    //set up refresh button.
}, [])

            const handleChangeMessage = event => {
                setMessage(event.target.value);
            }
            const handleChangeToUser = event => {
                setToUser(event.target.value);
            }

    const handleSubmit = async event => {
        
        event.preventDefault();
        setIsLoading(true);    // send message to server
        try {
            const response = await axios.put<{ rowID: string, data: any }>('http://192.168.4.45:3000/api/messageSend/', {
                fromUser: username,
                toUser: toUser,
                message: message,
                sentAt: '9999-12-31 23:59:59.997',
                status: 'delivered'
            });
    
            // reset the message field and toUser field
            setMessage('');

    
            // update the message list with the new message
            setMessages([...messages, response.data]);
        } catch (error) {
            console.error(error);
        }
    
        setIsLoading(false);
    }

    return (
        <Container>
            <TopNav />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">Messages</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <MessageList messages={messages} />
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        
                        <Stack>
                            <TextField label="To" value={toUser} onChange={handleChangeToUser} required />
                            <TextField label="Message" value={message} onChange={handleChangeMessage} required multiline rows={3} />
                            <ButtonGroup>
                                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>Send</Button>
                            </ButtonGroup>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
            <BottomNav />
        </Container>
    );
};

export default Messages;