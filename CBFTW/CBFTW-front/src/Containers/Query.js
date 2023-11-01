import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class Query extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ID: ''
    }
    this.socket = this.props.socket
    this.submitHandler = this.submitHandler.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitHandler() {

    //check if data is correctly formatted
    if (!this.state.ID) {
      alert('ID field must be filled in');
    } else {
      //Switch to feed
      this.props.switchFeedHandler(1)
      // this.socket.emit('REQUEST', { action: "INIT", data: { company: 'Alice', ID: 'invbob001', amount: 10000 } })
      this.socket.emit('REQUEST', { action: "QUERY", data: { ID: this.state.ID } });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form className="Main-inside">
        <Typography variant="display2">
          Query a single Bank, Customer or ForexPair
      </Typography>
        <TextField
          label="BANK, CUST OR FOREX ID"
          className={classes.textField}
          value={this.state.ID}
          onChange={this.handleChange('ID')}
          margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.submitHandler} disabled={!this.props.connected}>
          {this.props.connected ? "SEARCH" : "DISCONNECTED"}
        </Button>
        <br />
        <br />
        <br />
        <p >
          ID is case sensitive.
        </p>
      </form>

    );
  }
}


export default withStyles(styles)(Query);