import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {Button, Box, ButtonGroup, Grid, Typography, Stack, Divider, Container} from '@mui/material';
import sqlite3 from 'sqlite3';

import { getCookie } from 'typescript-cookie';
import axios from "axios";
import AccountPage from "../components/Account";
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import MembersPage from "../components/Members";


let userObj: UserInfo = {
    ID: '',
    AboutMe: '',
    AboutHome: '',
    AboutPets: '',
    PicturesURLs: '',
    Services: '',
    SizeCanHost: 0,
    SizeCanWatch: 0,
    Availability: '',
    Address: '',
    TypicalTodo: ''
  };
  

interface UserInfo {
    ID: string;
    AboutMe: string;
    AboutHome: string;
    AboutPets: string;
    PicturesURLs: string;
    Services: string;
    SizeCanHost: number;
    SizeCanWatch: number;
    Availability: string;
    Address: string;
    TypicalTodo: string;
  }

  function updateUserInfo(info: UserInfo): void {

  }
  let called1 = false;
  let called2 = false;
export default function Auth() {
    const [ass, setAss] = useState('');
    const [userName, setUserName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [aboutHome, setAboutHome] = useState('');
    const [aboutPets, setPets] = useState('');
    const [picURLS, setPicUrls] = useState('');
    const [services, setServices] = useState('');
    const [sizeCanHost, setSizeCanHost] = useState('');
    const [SizeCanWatch, setSizeCanWatch] = useState('');
    const [availability, setAvailability] = useState('');
    const [address, setAddress] = useState('');
    const [typicalTodo, setTypicalTodo] = useState('');


    const router = useRouter()
  let  authenticated = false;
    useEffect(() => {
       let tokenCall = getCookie('Token')
       let username = getCookie('Username')
       setUserName(
        username
      );
        const handleAuth = async () => {
            try {
           const response = await axios.post<{ message: string }>('http://localhost:3000/api/activeToken', {
              token: tokenCall
            });
            let responseString = response.data.message.toString()
            //let responseString1 = response.data.toString()
            //  console.log(responseString)
             // console.log(responseString1)
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
   const response = await axios.post<{ rowID: string, data: any }>('http://localhost:3000/api/userInfo', {
      token: tokenCall,
      username: username
    });
   // let tits = response.data.rowID.toString()

     // console.log(response.data.rowID.toString()) 
       // console.log(response.data.data)
     // console.log(response.data.data)
     setUserName(
        response.data.data.ID.toString()
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
        <TopNav/>
        <br></br>
        

<MembersPage 
    ID= {userName}
    AboutMe= {aboutMe}
    AboutHome= {aboutHome}
    AboutPets= {aboutPets}
    PicturesURLs= {picURLS}
    Services= {services}
    SizeCanHost= {0}
    SizeCanWatch= {0}
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