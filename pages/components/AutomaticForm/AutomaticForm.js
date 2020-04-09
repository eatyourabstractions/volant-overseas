import React, {useState} from 'react';
import DatePicker from './DatePicker';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '150%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  


const MyField = (props) =>{
    return (
        <Grid item xs={12} >
            <TextField
                variant="outlined"
                required
                fullWidth
                id={props.name}
                label={props.name}
                name={props.name}
                /*value={state[`${props.name}`]}
                onChange={handleChange}*/
        />
        </Grid>
    )
}

const ChooseInput = (props) =>{
    if(props.item.type === 'Date'){
        return( 
        <Grid item xs={12} >
            <DatePicker name={props.item.name}/>
        </Grid> )
    } else {
        return <MyField name={props.item.name} />
    }
    
}


export default function AutomaticForm(props){
  console.log(props)
    const classes = useStyles();
    const initialState = {};
    props.formFields.map(field => initialState[field.name] = '')
    props.dataStoreInDB.map(token => initialState[token[0]] = token[1])
    const [state, setState] = useState(initialState)

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
    return (
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {'Hi Mr. ' + 'michael'}
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
              { props.formFields.map((it,index) => {
                     return < ChooseInput key={index} item={it}/>
                } ) } 
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Apply changes
              </Button>
              
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      );
    
}