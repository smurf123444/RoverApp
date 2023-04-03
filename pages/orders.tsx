import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import { getCookie } from 'typescript-cookie';

const PendingOrdersContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '20px',
});

const PendingOrdersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [accountType, setAccountType] = useState('');
  const [username, setUserName] = useState('');
  useEffect(() => {

    let username = getCookie('Username')
    setUserName(username)
    let accountType = getCookie('AccountType')
    setAccountType(accountType)
    const fetchPendingOrders = async () => {
      setIsLoading(true);
  
      try {
        const response = await axios.post('http://192.168.4.45:3000/api/orders/', {
          user: username,
        });
        setPendingOrders(response.data.data);
        console.log(username);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  
      setIsLoading(false);
    };
  
    fetchPendingOrders();
  }, [username]);
  


  
  const pendingOrdersByStatus = {
    'Pending': [],
    'Accepted': [],
    'Completed': [],
  };

  pendingOrders.forEach((order) => {
    pendingOrdersByStatus[order.status] = pendingOrdersByStatus[order.status] || [];
    pendingOrdersByStatus[order.status].push(order);
  });
  
  const handleNewOrderClick = async (orderId) => {
    console.log(`Handle New Order Clicked for Order Id: ${orderId}`);
    try {
      const response = await axios.post('http://192.168.4.45:3000/api/updateOrderStatus', {
        orderID: orderId,
      });
      console.log(response.data);
      // Update the order's status in the local state
      const updatedOrders = pendingOrders.map((order) => {
        if (order.ID === orderId) {
          return { ...order, status: 'Accepted' };
        }
        return order;
      });
      setPendingOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInProgressClick = (orderId) => {
    console.log(`Handle In Progress Clicked for Order Id: ${orderId}`);
  };

  const handleCompletedClick = (orderId) => {
    console.log(`Handle Completed Clicked for Order Id: ${orderId}`);
  };

  const getButtonFunction = (type, orderId) => {
    switch(type) {
      case 'Pending':
        return () => handleNewOrderClick(orderId);
      case 'Accepted':
        return () => handleInProgressClick(orderId);
      case 'Completed':
        return () => handleCompletedClick(orderId);
      default:
        return null;
    }
  };

  return (
    <Box sx={{ m: '50px auto', maxWidth: '1000px' }}>
    <TopNav accountType={accountType} />
    {isLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <CircularProgress />
    </Box>
    ) : pendingOrders.length === 0 ? (
    <Typography variant="body1">No pending orders found.</Typography>
    ) : (
    <React.Fragment>
    {Object.keys(pendingOrdersByStatus).map((status) => (
    <PendingOrdersContainer key={status}>
    <Typography variant="h5" sx={{ marginBottom: '10px' }}>{status}</Typography>
    {pendingOrdersByStatus[status].length === 0 ? (
    <Typography variant="body1">No orders found.</Typography>
    ) : (
    <TableContainer component={Paper}>
    <Table>
    <TableHead>
    <TableRow>
    <TableCell>Order Type</TableCell>
    <TableCell>From UserName</TableCell>
    <TableCell>To UserName</TableCell>
    <TableCell>Order Start Date</TableCell>
    <TableCell>Order End Date</TableCell>
    <TableCell>Order Total</TableCell>
    <TableCell>Actions</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    {pendingOrdersByStatus[status].map((order, index) => (
    <TableRow key={index}>
    <TableCell>{order.type}</TableCell>
    <TableCell>{order.fromUser}</TableCell>
    <TableCell>{order.toUser}</TableCell>
    <TableCell>{order.dateStarted}</TableCell>
    <TableCell>{order.dateDue}</TableCell>
    <TableCell>{order.price}</TableCell>
    <TableCell>
    {status === 'Pending' ? (
    <Button onClick={() => handleNewOrderClick(order.ID)}>Accept</Button>
    ) : status === 'Accepted' ? (
    <Button onClick={() => handleInProgressClick(order.ID)}>In Progress</Button>
    ) : (
    <Button onClick={() => handleCompletedClick(order.ID)}>Complete</Button>
    )}
    </TableCell>
    </TableRow>
    ))}
    </TableBody>
    </Table>
    </TableContainer>
    )}
    </PendingOrdersContainer>
    ))}
    </React.Fragment>
    )}
    <BottomNav/>
    </Box>
    );
    };
    
    export default PendingOrdersPage;