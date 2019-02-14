import React, { Component } from "react";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PostSignIn from './HttpMethods/PostSignIn';
import { connect } from "react-redux";
import { updateToken } from "../../redux/actions/update_token";

const mapDispatchToProps = dispatch => {
  return {
    updateToken: token => dispatch(updateToken(token))
  };
};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      info: '',
      username: '',
      pwd: '',
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePwd(event) {
    this.setState({ pwd: event.target.value });
  }
  
  handleSubmit(event) {
    event.preventDefault();

    // 檢查是否有輸入欄位
    let fieldEmpty = false;
    fieldEmpty = fieldEmpty || this.state.username.length <= 0
    fieldEmpty = fieldEmpty || this.state.pwd.length <= 0
    if(fieldEmpty){
      console.log('console fieldEmpty, username:'+ this.state.username+", pwd:"+ this.state.pwd);
      return;
    }

    // 檢查是否登入成功
    let self = this;
    var callbackSignIn = function(token){ 
      if(undefined === token || token.length <= 0){
        console.log('console, fail sign in, username:'+ self.state.username+", pwd:"+ self.state.pwd+", token:"+token);
        self.setState({
          open: true,
          info: 'Sign in failed.'
        });
        return;
      }
      self.setState({ // FIXME 登入成功時並沒有出現
        open: true,
        info: 'You are now successfully signed in.'
      });
      self.props.updateToken(token);
    }
    PostSignIn(this.state.username, this.state.pwd, callbackSignIn);
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username"  autoFocus onChange={this.handleChangeUsername} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChangePwd} />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
      <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.info}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(SignIn);

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn));