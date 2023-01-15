import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {Button, Box, ButtonGroup, Grid, Typography, Stack, Divider, Container} from '@mui/material';
import sqlite3 from 'sqlite3';

import { getCookie } from 'typescript-cookie';
import axios from "axios";
import AccountPage from "../components/Account";
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";


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
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [messages, setMessages] = useState('');
    const [balance, setBalance] = useState('');
    const [sitterResources, setSitterResources] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [referralCode, setRefCode] = useState('');
    const [pets, setPets] = useState({});


    const router = useRouter()
  let  authenticated = false;
    useEffect(() => {
       let tokenCall = getCookie('Token')
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
   const response = await axios.post<{ rowID: string, data: any }>('http://localhost:3000/api/accountInfo', {
      token: tokenCall
    });
   // let tits = response.data.rowID.toString()

     // console.log(response.data.rowID.toString()) 
       // console.log(response.data.data)
      setUsername(response.data.rowID.toString());
      setAvatarUrl(response.data.data.avatarUrl.toString());
      setMessages(
        response.data.data.messages.toString()
      )
      setBalance(
        response.data.data.balance.toString()
      )
      setSitterResources(
        response.data.data.sitterResources.toString()
      )
      setPromoCode(
        response.data.data.promoCode.toString()
      )
      setRefCode(
        response.data.data.referralCode.toString()
      )
      setPets(
        response.data.data.pets
      )
     // console.log(response.data.data)
    //  console.log(userInfo.username)
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
        
        <AccountPage
  username={username}
  avatarUrl={avatarUrl}
  messages={["Hello", "Hi there"]}
  balance={50}
  sitterResources={["Take Rover 101", "Get advice from our Q&A Community"]}
  promoCode="PROMO123"
  referralCode="REFERRAL456"
  pets={[
    {
      name: "Mittens",
      breed: "Siamese",
      age: 3,
      size: "small",
      temperment: "friendly",
    },
    {
      name: "Fluffy",
      breed: "Persian",
      age: 5,
      size: "medium",
      temperment: "shy",
    },
  ]}
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