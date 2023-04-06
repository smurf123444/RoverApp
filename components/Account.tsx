import {Button, Box, ButtonGroup, Grid, Typography, Stack, Divider, Container, Link, Avatar, Toolbar, IconButton} from '@mui/material';
interface UserProps {
  username: string;
  avatarUrl: string;
  messages: string[];
  balance: number;
  sitterResources: string[];
  promoCode: string;
  referralCode: string;
  pets: {
    name: string;
    breed: string;
    age: number;
    size: string;
    temperment: string;
  }[];
}
const AccountPage: React.FC<UserProps> = (props) => {
  // Use the props in the component
  const { username, avatarUrl, messages, balance, sitterResources, promoCode, referralCode, pets } = props;
  console.log(avatarUrl)
  return (
    <div className="flex flex-col lg:flex-row space-x-2 text-neutral">

 <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={3}
  sx={{marginLeft: 35}}
>

    <Box sx={{ width: '100%', maxWidth: 500 }}>
<Container>
<Stack
  direction="column"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={7}
>
<Container sx={{ backgroundColor: "white"}}>

<Typography variant="h6" gutterBottom>
<Avatar alt="Remy Sharp" src="https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/284016785_7851303571548199_2360761860188972947_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=7CUqbwR3gPUAX-IWmaC&_nc_ht=scontent-mia3-1.xx&oh=00_AfC9koKpMT9jLlxaPk9gCoi6JUeOBLT6883VairF15d_Uw&oe=63B6FE92" />
  
         {username}
         <br></br>
         <Link href="/edit">EDIT LISTING</Link>
         <br></br>
         <Link href="/member">VIEW LISTING</Link>
      </Typography>
      </Container>
      <Container sx={{ backgroundColor: "white"}}>
      <Typography variant="subtitle1" gutterBottom>
        MESSAGES GO HERE
        <br></br>
        <Link href="/messages"> Message Center</Link>


      </Typography>
      </Container>
      <Container sx={{ backgroundColor: "white"}}>
      <Typography variant="body1" gutterBottom>
       
        <Link href="/balance"> BALANCE FOR DOG SITTING</Link>
      </Typography>
      </Container>
      <Container sx={{ backgroundColor: "white"}}>
      <Typography variant="body1" gutterBottom>
      Sitter Resources
Take Rover 101
New! Visit our Sitter Resources Center
Get Advice from our Q&A Community
<br></br>
<Link href="#">Link</Link>
      </Typography>
      </Container>
      </Stack>
</Container>
    </Box>
   <Box sx={{ width: '100%', maxWidth: 700 }}>
<Container>
<Stack
  direction="column"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={10}
>
<Container sx={{ backgroundColor: "white"}}>
<Typography variant="h6" gutterBottom>
Earn More, Play More
Attract new clients and their dogs by sharing your Rover profile link and promo code.
 Your promo code gives pet owners new to Rover $20 off their first booking—while you’ll still earn your full rate.
      </Typography>
      <br></br>
<Link href="#">Link</Link>
      </Container>
      <Container sx={{ backgroundColor: "white"}}>
      <Typography variant="subtitle1" gutterBottom>
      Refer a sitter, get $50
Earn a $50 Visa or Mastercard prepaid card* for every friend who becomes a sitter and completes a stay in their first 90 days.
      </Typography>
      <br></br>
<Link href="#">Link</Link>
      </Container>
      <Container sx={{ backgroundColor: "white"}}>
      <Typography variant="body1" gutterBottom>
      Your Pets
Add your pets or edit their info
      </Typography>
      <br></br>
<Link href="#">Link</Link>
      </Container>
      </Stack>
</Container>
    </Box>
    </Stack>
    </div>
  );
};

export default AccountPage;
