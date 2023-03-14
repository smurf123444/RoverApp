

import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {Button, Box, Typography, Container, TextField, createStyles} from '@mui/material';
import { getCookie } from 'typescript-cookie';
import axios from "axios";
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";

  let called1 = false;
  let called2 = false;
  let  authenticated = false;
export default function Edit() {
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
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
    const styles = theme =>
    createStyles({
      form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    });

    const router = useRouter()

    useEffect(() => {
       let tokenCall = getCookie('Token')
       let username = getCookie('Username')
        const handleAuth = async () => {
            try {
           const response = await axios.post<{ message: string }>('http://192.168.4.45:3000/api/activeToken', {
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
   const response = await axios.post<{ rowID: string, data: any }>('http://192.168.4.45:3000/api/accountInfo', {
      username: username
    });
   // let tits = response.data.rowID.toString()

     // console.log(response.data.rowID.toString()) 
       // console.log(response.data.data)
     // console.log(response.data.data)
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

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
/*         console.log(userName);
        console.log(token); */
        try {
            const request = axios.put<{ rowID: string, data: any }>('http://192.168.4.45:3000/api/EditUserInfo', {
                token: token,
                data12: userName,
                data1:listingName,
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
            {authenticated ? (
              <div>
<TopNav />
<Container maxWidth="sm">
<Box mt={8}>
<Typography component="h1" variant="h5">
Edit Profile
</Typography>
<form noValidate onSubmit={handleSubmit}>
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           id="listingName"
           label="Listing Name"
           name="listingName"
           autoComplete="listingName"
           value={listingName}
           onChange={(e) => setListingName(e.target.value)}
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="aboutMe"
           label="About Me"
           id="aboutMe"
           value={aboutMe}
           onChange={(e) => setAboutMe(e.target.value)}
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="aboutHome"
           label="About Home"
           id="aboutHome"
           value={aboutHome}
           onChange={(e) => setAboutHome(e.target.value)} 
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="aboutPets"
           label="About Pets"
           id="aboutPets"
           value={aboutPets}
           onChange={(e) => setPets(e.target.value)}
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="picURLS"
           label="Picture URLs"
           id="picURLS"
           value={picURLS}
           onChange={(e) => setPicUrls(e.target.value)}
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="services"
           label="Services"
           id="services"
           value={services}
           onChange={(e) => setServices(e.target.value)}
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="sizeCanHost"
           label="Size of Pets I Can Host"
           id="sizeCanHost"
           value={sizeCanHost}
           onChange={(e) => setSizeCanHost(e.target.value)}
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="sizeCanWatch"
           label="Size of Pets I Can Watch"
           id="sizeCanWatch"
           value={sizeCanWatch}
           onChange={(e) => setSizeCanWatch(e.target.value)}
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="availability"
           label="Availability"
           id="availability"
           value={availability}
           onChange={(e) => setAvailability(e.target.value)} 
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="address"
           label="Address"
           id="address"
           value={address}
           onChange={(e) => setAddress(e.target.value)} 
         />
<TextField
           variant="outlined"
           margin="normal"
           required
           fullWidth
           name="typicalTodo"
           label="Typical Todo"
           id="typicalTodo"
           value={typicalTodo}
           onChange={(e) => setTypicalTodo(e.target.value)} 
         />
<Button
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
         >
Update
</Button>
</form>
</Box>
</Container>
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
