import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import CardHeader from '@material-ui/core/CardHeader';
import green from '@material-ui/core/colors/green';
import AddNewTask from './AddNewTask';
import GetQuery from './HttpMethods/GetQuery';
// import TodoItemDetail from'./TodoItemDetail';
import TodoList from'./TodoList.js';
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
  state = {
    itemList: [],
  };

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

  handleUpdateData = (data) => {
    this.setState({
      itemList: data
    })
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
          <TodoList itemList={this.state.itemList} />
          {/* <div className={classNames(classes.layout, classes.cardGrid)}> */}
            {/* End hero unit */}
            {/* <Grid container spacing={16}>
              {cards.map(card => (
                <Grid item key={card} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                      <CardHeader
                          title="Shrimp and Chorizo Paella"
                      />
                      <CardContent className={classes.cardContent}>
                          <Typography>
                              This is a media card. You can use this section to describe the content.
                          </Typography>
                      </CardContent>
                      <CardActions>
                          <Button size="small" color="primary">
                              Done
                          </Button>
                          <Button size="small" color="primary">
                              Edit
                          </Button>
                          <Button size="small" color="primary">
                              Delete
                          </Button>
                      </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div> */}
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