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

class CreateForex extends React.Component {
  state = {
    name: null,
    rate: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createHandler = () => {
    //Check form validity
    if (!(this.state.name && this.state.rate)) {
      alert('All fields must be filled in');
    } else if (this.state.name.split(':').length < 2) {
      alert('Forex format should be in XYZ:ABC format');
    } else {
      this.props.switchFeedHandler(1);
      this.props.socket.emit('REQUEST', { action: "CREATEFOREX", data: this.state });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className="Main-inside" noValidate autoComplete="off">
        <Typography variant="display2">
          Create a Forex
        </Typography>
        <TextField
          label="FOREX"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('ename')}
          margin="normal"
        />
        <TextField
          label="RATE"
          className={classes.textField}
          value={this.state.rate}
          onChange={this.handleChange('rate')}
          margin="normal"
        />
        <Button variant="contained"
          color="primary"
          disabled={!this.props.connected}
          className={classes.button}
          onClick={this.createHandler}>
          {this.props.connected ? "CREATE FOREX" : "DISCONNECTED"}
        </Button>
        <p>FOREX should be of type XYZ:ABC</p>
      </form>

    );
  }
}


export default withStyles(styles)(CreateForex);