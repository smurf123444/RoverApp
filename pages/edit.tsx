

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



  let called1 = false;
  let called2 = false;
  let  authenticated = false;
export default function Edit() {
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
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

    useEffect(() => {
       let tokenCall = getCookie('Token')
       let username = getCookie('Username')
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

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
/*         console.log(userName);
        console.log(token); */
        try {
            const request = axios.put<{ rowID: string, data: any }>('http://localhost:3000/api/EditUserInfo', {
                token: token,
                data1: userName,
                data2: aboutMe,
                data3: aboutHome,
                data4: aboutPets,
                data5: picURLS,
                data6: services,
                data7: sizeCanHost,
                data8: sizeCanWatch,
                data9: availability,
                data10: address,
                data11: typicalTodo,
            });
/*             console.log(availability); */
        } catch (err) {
            console.error(err);
            console.log("TITS")
        }
    }
    return (
        <div>
{/*            <form onSubmit={handleSubmit}>
<input value={userName} onChange={(e) => setUserName(e.target.value)} />
<input value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
<input value={aboutHome} onChange={(e) => setAboutHome(e.target.value)} />
<input value={aboutPets} onChange={(e) => setPets(e.target.value)} />
<input value={picURLS} onChange={(e) => setPicUrls(e.target.value)} />
<input value={services} onChange={(e) => setServices(e.target.value)} />
 <input value={sizeCanHost} onChange={(e) => setSizeCanHost(e.target.value)} />
<input value={sizeCanWatch} onChange={(e) => setSizeCanWatch(e.target.value)} /> 
<input value={availability} onChange={(e) => setAvailability(e.target.value)} />
<input value={address} onChange={(e) => setAddress(e.target.value)} />
<input value={typicalTodo} onChange={(e) => setTypicalTodo(e.target.value)} />
<button type="submit">Save</button>


 <p>
    {authenticated ? (<h3>Authenticated</h3>):(<h3>NOT Authenticated</h3>)}
</p> 
</form>*/}
            {authenticated ? (
                <div>
                    <TopNav />


                    <form onSubmit={handleSubmit}>
<input value={userName} onChange={(e) => setUserName(e.target.value)} />
<input value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
<input value={aboutHome} onChange={(e) => setAboutHome(e.target.value)} />
<input value={aboutPets} onChange={(e) => setPets(e.target.value)} />
<input value={picURLS} onChange={(e) => setPicUrls(e.target.value)} />
<input value={services} onChange={(e) => setServices(e.target.value)} />
 <input value={sizeCanHost} onChange={(e) => setSizeCanHost(e.target.value)} />
<input value={sizeCanWatch} onChange={(e) => setSizeCanWatch(e.target.value)} /> 
<input value={availability} onChange={(e) => setAvailability(e.target.value)} />
<input value={address} onChange={(e) => setAddress(e.target.value)} />
<input value={typicalTodo} onChange={(e) => setTypicalTodo(e.target.value)} />
<button type="submit">Save</button>

{/* Hydration Error */}
{/* <p>
    {authenticated ? (<h3>Authenticated</h3>):(<h3>NOT Authenticated</h3>)}
</p> */}
</form>

                    <BottomNav />
                </div>
            ) : (
                    <div>
                        <TopNav />
                       {/*  <AccountPage /> */}
                        <BottomNav />
                    </div>
                )}
        </div>
    );
}
