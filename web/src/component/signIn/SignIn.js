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
import uuidv1 from "uuid";
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
      email: "",
      pwd:"",
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePwd(event) {
    this.setState({ pwd: event.target.value });
  }
  
  handleSubmit(event) {
    event.preventDefault();

    // 檢查是否有輸入欄位
    let fieldEmpty = false;
    fieldEmpty = fieldEmpty || this.state.email.length == 0
    fieldEmpty = fieldEmpty || this.state.pwd.length == 0
    if(fieldEmpty){
      console.log('console fieldEmpty, email:'+ this.state.email+", pwd:"+ this.state.pwd);
      return;
    }

    // TODO 檢查是否登入成功
    let SignInSuccessful = false;
    let token = '';

    if(!SignInSuccessful || token.length == 0 ){
      console.log('console sign in fail, email:'+ this.state.email+", pwd:"+ this.state.pwd+", token:"+token);
      return;
    }

    this.props.updateToken(token);
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
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email"  autoFocus onChange={this.handleChangeEmail} />
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
    </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(SignIn);

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn));