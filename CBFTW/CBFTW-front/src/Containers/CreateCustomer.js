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

class CreateCustomer extends React.Component {
  state = {
    name: null,
    ID: null,
    country: null,
    currency: null,
    balance: null,
    customerBankID: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createHandler = () => {
    //Check form validity
    if (!(this.state.ID && this.state.name && this.state.country && this.state.currency && this.state.balance && this.state.customerBankID)) {
      alert('All fields must be filled in');
    } else if (this.state.ID.length < 3 || isNaN(this.state.ID)) {
      alert('ID MUST BE GREATER THAN 99');
    } else {
      this.props.switchFeedHandler(1)
      this.props.socket.emit('REQUEST', { action: "CREATECUSTOMER", data: this.state })
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className="Main-inside" noValidate autoComplete="off">
        <Typography variant="display2">
          Create a Customer
        </Typography>
        <TextField
          label="CUSTOMER NAME"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('cname')}
          margin="normal"
        />
        <TextField
          label="CUSTOMER ID"
          className={classes.textField}
          value={this.state.ID}
          onChange={this.handleChange('ID')}
          margin="normal"
        />
        <TextField
          label="COUNTRY"
          className={classes.textField}
          value={this.state.country}
          onChange={this.handleChange('ccountry')}
          margin="normal"
        />
        <TextField
          label="CURRENCY"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('ccurrency')}
          margin="normal"
        />
        <TextField
          label="BALANCE"
          className={classes.textField}
          value={this.state.balance}
          onChange={this.handleChange('balance')}
          margin="normal"
        />
        <TextField
          label="CUST BANK ID"
          className={classes.textField}
          value={this.state.customerBankID}
          onChange={this.handleChange('customerBankID')}
          margin="normal"
        />
        <Button variant="contained"
          color="primary"
          disabled={!this.props.connected}
          className={classes.button}
          onClick={this.createHandler}>
          {this.props.connected ? "CREATE CUSTOMER" : "DISCONNECTED"}
        </Button>
        <p>Customer ID is case sensitive</p>
      </form>

    );
  }
}


export default withStyles(styles)(CreateCustomer);