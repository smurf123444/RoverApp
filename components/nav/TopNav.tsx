import {Stack, AppBar, Toolbar, Link, Container, Divider} from '@mui/material';

const TopNav = () => {


  return (
    <div className="flex flex-col lg:flex-row space-x-2 text-neutral">
      <AppBar position="static">
  <Toolbar variant="dense">

  <Stack
  direction="row"
  divider={<Divider orientation="vertical" flexItem />}
  spacing={5}
>
      <Container>
<Link sx={{color: 'white'}}href="#"> TEST </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="#"> TEST </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="#"> TEST </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="#"> TEST </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="#"> TEST </Link>
      </Container>
      </Stack>

  </Toolbar>
</AppBar>

    </div>
  );
};

export default TopNav;
