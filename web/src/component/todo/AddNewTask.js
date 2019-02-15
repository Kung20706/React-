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
});

class SimpleModal extends React.Component {
  constructor(props,context){
    super(props,context);

    this.state = {
      open: false,
      title: 'New Task',
      content: '',
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
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  
  handleRepleaceAll = () => {
    let self = this;
    var callRepleaceAll = function(data){ 
      if(!data){
        console.log('request fail data:', data); 
        return
      }
      console.log('request successful data:', data); 
      self.props.handleUpdateData(data)

      self.handleClose()
    }

    if(!this.state.title || this.state.title.length <=0){
      console.log('!this.state.title || this.state.title.length <=0, )'+this.state.title); 
      return
    }

    if(!this.state.content || this.state.content.length <=0){
      console.log('!this.state.content || this.state.content.length <=0, )'+this.state.content); 
      return
    }

    let itemDetail = new TodoItemDetail(this.state.title, this.state.content, false);
    let data = JSON.stringify([itemDetail, ...this.props.itemList]);
    PostRepleaceAll(this.props.token, data, callRepleaceAll)
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen} variant="contained" color="primary">
          Add Task
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Add Task
            </Typography>
            <FormControl margin="normal" required fullWidth>
                <InputLabel >Title</InputLabel>
                <Input onChange={this.handleTitle} id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField onChange={this.handleContent}
                    placeholder="Content"
                    multiline={true}
                    rows={5}
                    rowsMax={5}
                    autoFocus
                />
            </FormControl>
            <Button onClick={this.handleRepleaceAll} variant="contained" color="primary">
                Add Task
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
