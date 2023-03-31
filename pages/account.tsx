import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import { getCookie } from 'typescript-cookie';
import axios from "axios";
import AccountPage from "../components/Account";
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";

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
    let authenticated = false;

  useEffect(() => {
    let tokenCall = getCookie('Token')
    let userName = getCookie('Username')
    setUsername(userName);
    const handleAuth = async () => {
      try {
        const response = await axios.post<{ message: string }>('http://192.168.4.45:3000/api/activeToken', {
            token: tokenCall
        });
        let responseString = response.data.message.toString()
        if (responseString = 'Successfully Authenticated'){
            authenticated = true;
          }
      } catch (error) {
        router.push('/login')
        console.log("Couldnt authenticate....")
          return (false)
      }
    }

  if(called1 == false){
    handleAuth();
          called1 = true;
  }
const handleInfo = async () => {
    try {
   const response = await axios.post<{ rowID: string, data: any }>('http://192.168.4.45:3000/api/userInfo', {
      token: tokenCall,
      username: userName
    });
      setUsername(response.data.rowID.toString());
      setAvatarUrl(response.data.data.avatarUrl.toString());
      setMessages(response.data.data.messages.toString())
      setBalance(response.data.data.balance.toString())
      setSitterResources(response.data.data.sitterResources.toString())
      setPromoCode(response.data.data.promoCode.toString())
      setRefCode(response.data.data.referralCode.toString())
      setPets(response.data.data.pets)
          return(response.data.data)
    } catch (error) {
      return ( false )
    }
  }
  if(called2 == false)
  {
    handleInfo();
    called2 = true;
  }});
  if(authenticated = true)
  {
    return (
<div>
  <TopNav />
  <br />
  <AccountPage
    username={username}
    avatarUrl={avatarUrl}
    messages={["Hello", "Hi there"]}
    balance={50}
    sitterResources={["Take Rover 101", "Get advice from our Q&A Community"]}
    promoCode="PROMO123"
    referralCode="REFERRAL456"
    pets={[      { name: "Mittens", breed: "Siamese", age: 3, size: "small", temperament: "friendly" },      { name: "Fluffy", breed: "Persian", age: 5, size: "medium", temperament: "shy" },    ]}
  />
  <br />
  <BottomNav />
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