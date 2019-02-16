import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import PostRepleaceAll from './HttpMethods/PostRepleaceAll';
import TodoItemDetail from'./TodoItemDetail';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  textAddTask:{
    width: '100%',
    textAlign: 'center',
  },
  btnCancelTask:{
    width: '45%',
    margin: 8,
  },
  btnOKTask:{
    width: '45%',
    margin: 8,
  },
});

class SimpleModal extends React.Component {
  constructor(props,context){
    super(props,context);

    this.state = {
      open: false,
      title: this.props.title,
      content: this.props.content,
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
  }

  handleTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleOpen = () => {
    this.setState({ 
      open: true,
      title: this.props.title,
      content: this.props.content,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditOK = () => {
    this.props.handleEditOK(this.props.indexOfCard, this.state.title, this.state.content);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleOpen} >
          Edit
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title" className={classes.textAddTask} >
              Edit Task
            </Typography>
            <FormControl margin="normal" required fullWidth>
                <InputLabel >Title</InputLabel>
                <Input onChange={this.handleTitle} value={this.state.title} id="email" name="email" autoComplete="email" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField onChange={this.handleContent}
                    value={this.state.content}
                    placeholder="Content"
                    multiline={true}
                    rows={5}
                    rowsMax={5}
                />
            </FormControl>
            <Button onClick={this.handleClose} variant="contained" color="primary" className={classes.btnCancelTask} >
                Cancel
            </Button>
            <Button onClick={this.handleEditOK} variant="contained" color="primary" className={classes.btnOKTask}>
                OK
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
