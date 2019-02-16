import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import AddNewTask from './AddNewTask';
import GetQuery from './HttpMethods/GetQuery';
import PostRepleaceAll from './HttpMethods/PostRepleaceAll';
import TodoList from'./TodoList.js';
import DialogOfDeleteItem from'./DialogOfDeleteItem.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  avatar: {
    margin: 10,
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      itemList: [],
      deleteIndex: -1,
      open: false,
    };

    this.handleUpdateSelected = this.handleUpdateSelected.bind(this);
    this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
  }

  componentDidMount(){
    let self = this;
    var callRepleaceAll = function(data){ 
      if(!data){
        console.log('request fail data:', data); 
        return
      }

      console.log('2 request successful data:', data); 
      
      self.setState({
        itemList: data
      })
    }
    GetQuery(this.props.token, callRepleaceAll)

    console.log('new itemList:', this.state.itemList); 
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteDialog(event) {
    this.setState({ 
      open: true,
      deleteIndex: event.currentTarget.value,
    });
  }

  handleDelete = () => {
    let index = this.state.deleteIndex;
    let newArray = [...this.state.itemList]
    newArray.splice(index, 1); 

    console.log('delete, index:'+ index); 
    console.log('old Array:', this.state.itemList); 
    console.log('new Array:', newArray); 

    this.handleRepleaceAll(newArray)
  }

  handleUpdateData = (data) => {
    this.setState({
      open: false,
      itemList: data,
    })
  };

  handleUpdateSelected(event) {
    console.log('value:'+ event.currentTarget.value); 

    let index = event.currentTarget.value;

    let newArray = [...this.state.itemList];
    newArray[index].Selected = !newArray[index].Selected

    this.handleRepleaceAll(newArray)
  };

  handleRepleaceAll = (newArray) => {
    let self = this;
    var callRepleaceAll = function(data){ 
      if(!data){
        console.log('request fail data:', data); 
        return
      }
      console.log('request successful data:', data); 
      self.handleUpdateData(data)
    }

    let data = JSON.stringify(newArray);
    PostRepleaceAll(this.props.token, data, callRepleaceAll)
  };

  render() {
    const { classes, token } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  To-Do
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                  Very simple To-Do List.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <AddNewTask token={token} itemList={this.state.itemList} handleUpdateData={this.handleUpdateData}/>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined">
                      Sign out
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <TodoList itemList={this.state.itemList} handleUpdateSelected={this.handleUpdateSelected}  handleDeleteDialog={this.handleDeleteDialog}/>
          <DialogOfDeleteItem
            open={this.state.open}
            onClose={this.handleClose}
            handleDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default withStyles(styles)(App);