import {Typography, AppBar, Toolbar, Stack, Divider, Container, Link, Button, Menu, MenuItem, Fade} from '@mui/material';
import * as React from 'react';
const TopNav = () => {

      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

      const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);

      const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };


      const open1 = Boolean(anchorEl1);
      const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl1(event.currentTarget);
          };
          const handleClose1 = () => {
            setAnchorEl1(null);
          };

          const open2 = Boolean(anchorEl2);
          const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
                setAnchorEl2(event.currentTarget);
              };
              const handleClose2 = () => {
                setAnchorEl2(null);
              };
  return (
    <div className="flex flex-col lg:flex-row space-x-2 text-neutral">
      <AppBar position="static">
  <Toolbar variant="dense">


<Container>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuItem sx={{color: 'white'}}> Dashboard </MenuItem>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}><Link sx={{color: 'black'}}href="/account"> Account </Link></MenuItem>

        <MenuItem onClick={handleClose}><Link sx={{color: 'black'}}href="/messages"> Messages </Link></MenuItem>
        <MenuItem onClick={handleClose}><Link sx={{color: 'black'}}href="/search"> Search </Link></MenuItem>
        <MenuItem onClick={handleClose}><Link sx={{color: 'black'}}href="/balance"> Balance </Link></MenuItem>
      </Menu>

      </Container>


      <Container>
      <Button
        id="fade-button"
        aria-controls={open1 ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick1}
      >
        <MenuItem sx={{color: 'white'}}> Listing </MenuItem>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose1}>      <Link sx={{color: 'black'}}href="/member"> Listing Page </Link></MenuItem>
        <MenuItem onClick={handleClose1}>     <Link sx={{color: 'black'}}href="/edit"> Edit Listing </Link></MenuItem>
      </Menu>
      </Container>

      <Container>
      <Button
        id="fade-button"
        aria-controls={open1 ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        onClick={handleClick2}
      >
        <MenuItem sx={{color: 'white'}}> ORDERS </MenuItem>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose2}>      <Link sx={{color: 'black'}}href="/active"> Active </Link></MenuItem>
        <MenuItem onClick={handleClose2}>     <Link sx={{color: 'black'}}href="/pending"> Pending  </Link></MenuItem>
        <MenuItem onClick={handleClose2}>     <Link sx={{color: 'black'}}href="/past"> Past </Link></MenuItem>
      </Menu>
      </Container>



      <Container>        
            <MenuItem onClick={handleClose}><Link sx={{color: 'white', marginLeft: '10%'}}href="/logout"> Logout </Link></MenuItem>
            <MenuItem onClick={handleClose}><Link sx={{color: 'white',  marginLeft: '10%'}}href="/register"> Register </Link></MenuItem>
      </Container>
  </Toolbar>
</AppBar>



    </div>
  );
};

export default TopNav;
