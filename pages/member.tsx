import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {Button, Box, ButtonGroup, Grid, Typography, Stack, Divider, Container} from '@mui/material';

import { getCookie } from 'typescript-cookie';
import axios from "axios";
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import MembersPage from "../components/Members";


  let called1 = false;
  let called2 = false;
export default function Auth() {
    const [ass, setAss] = useState('');
    const [userName, setUserName] = useState('');
    const [accountType, setAccountType] = useState('');
    const [listingName, setListingName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [aboutHome, setAboutHome] = useState('');
    const [aboutPets, setPets] = useState('');
    const [picURLS, setPicUrls] = useState('');
    const [services, setServices] = useState('');
    const [sizeCanHost, setSizeCanHost] = useState('');
    const [sizeCanWatch, setSizeCanWatch] = useState('');
    const [availability, setAvailability] = useState('');
    const [address, setAddress] = useState('');
    const [typicalTodo, setTypicalTodo] = useState('');


    const router = useRouter()
  let  authenticated = false;
    useEffect(() => {
       let tokenCall = getCookie('Token')
       let username = getCookie('Username')
       const accountType = getCookie('AccountType')
       setAccountType(accountType)
       setUserName(
        username
      );
        const handleAuth = async () => {
            try {
           const response = await axios.post<{ message: string }>('http://192.168.4.45:3000/api/activeToken', {
              token: tokenCall
            });
            let responseString = response.data.message.toString()
          if (responseString = 'Successfully Authenticated')
          {
            authenticated = true;
          }
            } catch (error) {
              router.push('/login')
              console.log("Couldnt authenticate....")
              return (
                  false
                 )
            }
          }
          if(called1 == false)
          {
            handleAuth();
            called1 = true;
          }

const handleInfo = async () => {
    try {
   const response = await axios.post<{ rowID: string, data: any }>('http://192.168.4.45:3000/api/accountInfo', {
      token: tokenCall,
      username: username
    });
     setUserName(
        response.data.data.username.toString()
      );
      setListingName(
        response.data.data.listingName.toString()
      );
      setAboutMe(
        response.data.data.AboutMe.toString()
      );
      setAboutHome(
        response.data.data.AboutHome.toString()
      );
      setPets(
        response.data.data.AboutPets.toString()
      );
      setPicUrls(
        response.data.data.PicturesURLs.toString()
      );
      setServices(
        response.data.data.Services.toString()
      );
      setSizeCanHost(
        response.data.data.SizeCanHost.toString()
      );
      setSizeCanWatch(
        response.data.data.SizeCanWatch.toString()
      );
      setAvailability(
        response.data.data.Availability.toString()
      );
      setAddress(
        response.data.data.Address.toString()
      );
      setTypicalTodo(
        response.data.data.TypicalTodo.toString()
      );
      console.log(response.data.data.ID)
        return(response.data.data)
    } catch (error) {

      return (
          false
         )
    }
  }
  if(called2 == false)
  {
    handleInfo();
    called2 = true;
  }

      });
  if(authenticated = true)
  {
    return (
        <div>
        <TopNav accountType={accountType}/>
        <br></br>
<MembersPage 
    ID= {userName}
    listingName= {listingName}
    AboutMe= {aboutMe}
    AboutHome= {aboutHome}
    AboutPets= {aboutPets}
    PicturesURLs= {picURLS}
    Services= {services}
    SizeCanHost= {sizeCanHost}
    SizeCanWatch= {sizeCanWatch}
    Availability= {availability}
    Address= {address}
    TypicalTodo= {typicalTodo}
    />
        <br></br>
        <BottomNav/>
        </div>
      );
  }
  else{
    return (
        <div>
          <h1>Fuck Off</h1>
        </div>
      );
  }
  }