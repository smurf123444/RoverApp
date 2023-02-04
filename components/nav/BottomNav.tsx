import {Typography, AppBar, Toolbar, Stack, Divider, Container, Link} from '@mui/material';

const BottomNav = () => {


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
<Link sx={{color: 'white'}}href="/account"> Account </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="/member"> Member </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="/edit"> Edit </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="/messages"> Messages </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="/login"> Login </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="/logout"> Logout </Link>
      </Container>
      <Container>
<Link sx={{color: 'white'}}href="/register"> Register </Link>
      </Container>

      </Stack>

  </Toolbar>
</AppBar>

    </div>
  );
};

export default BottomNav;
