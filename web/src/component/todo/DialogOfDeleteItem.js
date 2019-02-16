import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';

class DialogOfDeleteItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }
  handleCancel = () => {
    this.props.onClose();
  };

  handleDelete = () => {
    this.props.handleDelete();
  };

  render() {
    const { handleDelete, ...other } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogContent>
            <DialogContentText>
                Delete task?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary">
                Delete
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogOfDeleteItem.propTypes = {
  onClose: PropTypes.func,
};

export default (DialogOfDeleteItem);
