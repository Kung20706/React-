import React from 'react';
import PropTypes from 'prop-types';
// import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class DoneChip extends React.Component{
  render(){
    // const { classes } = this.props;
    if(this.props.selected){ 
      return (
        <Typography>
          DONE
        </Typography>
        // <Chip 
        //     label={"Done"} 
        //     className={classes.chip} variant="outlined" 
        // />
      );
    }
    return (
      <div>
      </div>
    );
  }
}

DoneChip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DoneChip);