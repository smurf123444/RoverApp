import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

interface UserProps {
  ID: string;
  listingName: string;
  AboutMe: string;
  AboutHome: string;
  AboutPets: string;
  PicturesURLs: string;
  Services: string;
  SizeCanHost: string;
  SizeCanWatch: string;
  Availability: string;
  Address: string;
  TypicalTodo: string;
  PricePerDay: string;
}

const MembersPage: React.FC<UserProps> = (props) => {
  const {
    ID,
    listingName,
    AboutMe,
    AboutHome,
    AboutPets,
    PicturesURLs,
    Services,
    SizeCanHost,
    SizeCanWatch,
    Availability,
    Address,
    TypicalTodo,
    PricePerDay,
  } = props;

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
    <Toolbar sx={{ backgroundColor: "#F9FAFB", boxShadow: "none", borderBottom: "1px solid #E5E7EB" }}>
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Typography variant="h6" component="div">
          {ID}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="large" aria-label="profile">
          <Avatar alt="Profile Picture" src="https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/284016785_7851303571548199_2360761860188972947_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=7CUqbwR3gPUAX-IWmaC&_nc_ht=scontent-mia3-1.xx&oh=00_AfC9koKpMT9jLlxaPk9gCoi6JUeOBLT6883VairF15d_Uw&oe=63B6FE92" sx={{ width: 40, height: 40 }} />
        </IconButton>
      </Box>
    </Toolbar>
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item xs={12} sm={6}>
          <Stack direction="column" spacing={2}>
            <Typography variant="subtitle1">Listing Name:</Typography>
            <Typography variant="body1">{listingName}</Typography>
            <Typography variant="subtitle1">Services:</Typography>
            <Typography variant="body1">{Services}</Typography>
            <Typography variant="subtitle1">Can Host:</Typography>
            <Typography variant="body1">{SizeCanHost}</Typography>
            <Typography variant="subtitle1">Can Watch:</Typography>
            <Typography variant="body1">{SizeCanWatch}</Typography>
            <Typography variant="subtitle1">Availability:</Typography>
            <Typography variant="body1">{Availability}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction="column" spacing={2}>
            <Typography variant="subtitle1">
              PICTURES OF PET SITTINGS:
            </Typography>
            <Typography variant="body1">{PicturesURLs}</Typography>
            <Typography variant="subtitle1">About {ID}:</Typography>
            <Typography variant="body1">
              Home:
              <br />
              {AboutHome}
              <br />
              <br />
              Me:
              <br />
              {AboutMe}
            </Typography>
            <Typography variant="subtitle1">Your Pets:</Typography>
            <Typography variant="body1">{AboutPets}</Typography>
            <Typography variant="subtitle1">Typical Things To Do:</Typography>
            <Typography variant="body1">{TypicalTodo}</Typography>
            <Typography variant="subtitle1">Address:</Typography>
            <Typography variant="body1">{Address}</Typography>
            <Typography variant="subtitle1">Price Per Day:</Typography>
            <Typography variant="body1">{PricePerDay}</Typography>
            </Stack>
            </Grid>
            </Grid>
            </Box>
            );
            };

export default MembersPage;
