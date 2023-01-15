import {Button, Box, ButtonGroup, Grid, Typography, Stack, Divider, Container, Link, Avatar, Toolbar, IconButton} from '@mui/material';
interface UserProps {
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
const MembersPage: React.FC<UserProps> = (props) => {
  // Use the props in the component
  const { ID, AboutMe, AboutHome, AboutPets, PicturesURLs, Services, SizeCanHost, SizeCanWatch, Availability, Address, TypicalTodo } = props;
  console.log(props)
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
  spacing={5}
>
<Typography variant="h6" gutterBottom>
<Avatar alt="Remy Sharp" src="https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/284016785_7851303571548199_2360761860188972947_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=7CUqbwR3gPUAX-IWmaC&_nc_ht=scontent-mia3-1.xx&oh=00_AfC9koKpMT9jLlxaPk9gCoi6JUeOBLT6883VairF15d_Uw&oe=63B6FE92" />
         {props.ID}

      </Typography>

      <Container sx={{ backgroundColor: "tan"}}>
      <Typography variant="subtitle1" gutterBottom>
        Services: 
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {Services}
      </Typography>
      </Container>
      <Container sx={{ backgroundColor: "tan"}}>
      <Typography variant="body1" gutterBottom>
          Can Host
          {SizeCanHost}
      </Typography>
      </Container>
      <Container sx={{ backgroundColor: "tan"}}>
      <Typography variant="body1" gutterBottom>
          Can Watch
          {SizeCanWatch}
      </Typography>
      </Container>
      <Container sx={{ backgroundColor: "tan"}}>
      <Typography variant="body1" gutterBottom>
      Availability
      {Availability}
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
  spacing={5}
>
<Container sx={{ backgroundColor: "tan"}}>
<Typography variant="h6" gutterBottom>
PICTURES OF PET SITTINGS:
{PicturesURLs}
      </Typography>
      <br></br>
<Link href="#">Link</Link>
      </Container>
      <Container sx={{ backgroundColor: "tan"}}>
      <Typography variant="subtitle1" gutterBottom>
About {ID}
<br></br>
Home:
<br></br>
{AboutHome}
<br></br>
Me:
<br></br>
{AboutMe}
      </Typography>
      <br></br>
<Link href="#">Link</Link>
      </Container>
      <Container sx={{ backgroundColor: "tan"}}>
      <Typography variant="body1" gutterBottom>
      Your Pets
      <br></br>
      {AboutPets}
      <br></br>
Add your pets or edit their info
      </Typography>
<Link href="#">Link</Link>
      </Container>

      </Stack>
</Container>

    </Box>
    
    </Stack>
    <br></br>
    <Container sx={{ backgroundColor: "tan"}}>
      <Typography variant="body1" gutterBottom>
     The Neighborhood
      <br></br>
      {Address}
      <br></br>
Typical Todos:
<br></br>
{TypicalTodo}
      </Typography>
<Link href="#">Link</Link>
      </Container>
    </div>
  );
};

export default MembersPage;
