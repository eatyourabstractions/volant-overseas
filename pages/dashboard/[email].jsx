import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// other material ui icons
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


// my components
import FirstParagraph from '../components/FirstParagraph';
import SecondParagraph from '../components/SecondParagraph';
import UserDataForm from '../components/UserDataForm'

import fetch  from "isomorphic-unfetch";
//import useSWR from 'swr'
//import { useRouter } from 'next/router'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function UserDashboard(props) {
  //const router = useRouter();
  //const email = router.query.email
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [myChoice, setChoice] = React.useState('first');
 /*
  async function fetcher(...args) {
    const res = await fetch(...args)
    return res.json()
  }*/
  //const { data, error } = useSWR(`http://localhost:3000/getUserFromDB/${email}`, fetcher)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const conditionalRendering = (choice) => {
    switch (choice) {
      case 'first':
        return <FirstParagraph />;
      case 'second':
        return <SecondParagraph />;
      case 'form':
        return <UserDataForm userData={props.formData}/>;
      default:
        return null;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Volant Overseas
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          <List>
            <ListItem button onClick={(event) => setChoice('form')}>
              <ListItemIcon><PersonIcon/></ListItemIcon>
              <ListItemText primary={'My Profile'}/>
            </ListItem>
            <ListItem button onClick={(event) => setChoice('first')}>
              <ListItemIcon><DescriptionIcon/></ListItemIcon>
              <ListItemText primary={'My Documents'}/>
            </ListItem>
            <ListItem button onClick={(event) => setChoice('second')}>
              <ListItemIcon><VpnKeyIcon/></ListItemIcon>
              <ListItemText primary={'Change Password'}/>
            </ListItem>
            <ListItem button onClick={(event) => setChoice('first')}>
              <ListItemIcon><AllInboxIcon/></ListItemIcon>
              <ListItemText primary={'Documents samples & Links'}/>
            </ListItem>
            <ListItem button onClick={(event) => setChoice('second')}>
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary={'Logout'}/>
            </ListItem>
          </List>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {conditionalRendering(myChoice)}
      </main>
    </div>
  );
}


export async function getServerSideProps(ctx){
  const {email} = ctx.params
  const res = await fetch(`http://localhost:3000/getUserFromDB/${email}`)
  const data = await res.json()
  console.log('SSR-props: ' + data)
  // Pass data to the page via props
  return { 
    props: {formData: data} }

}


