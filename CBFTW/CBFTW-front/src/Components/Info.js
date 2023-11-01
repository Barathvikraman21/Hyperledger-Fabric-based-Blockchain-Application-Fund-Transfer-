import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Logo from '../Components/Logo';

const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: '85%',
    backgroundColor: theme.palette.background.paper,
  },
});

function FolderList(props) {
  const { classes } = props;
  const data = props.data.map(details => {
    if (details.Record && details.Record.custID && details.Record.custID !== null) {
      return (<ListItem key={details.Key}>
        <Avatar>
          <AccountBoxIcon />
        </Avatar>
        <ListItemText primary={details.Key} secondary={`CName: ${details.Record.cname}, Customer Bank ID: ${details.Record.customerBankID}, Customer ID: ${details.Record.custID}, Currency: ${details.Record.ccurrency}, Country: ${details.Record.ccountry}, and Balance: ${details.Record.balance}`} />
      </ListItem>)
    } else if (details.Record && details.Record.bankID && details.Record.bankID !== null) {
      return (<ListItem key={details.Key}>
        <Avatar>
          <AccountBalanceIcon />
        </Avatar>
        <ListItemText primary={details.Key} secondary={`BName: ${details.Record.bname}, Bank ID: ${details.Record.bankID}, Country: ${details.Record.bcountry}, Currency: ${details.Record.bcurrency}, Currency: ${details.Record.bcurrency}, and Reserves: ${details.Record.reserves}`}  />
      </ListItem>)
    } else if (details.Record && details.Record.pair && details.Record.pair !== null) {
      return (<ListItem key={details.Key}>
        <Avatar>
          <AttachMoneyIcon />
        </Avatar>
        <ListItemText primary={details.Key} secondary={`Pair: ${details.Record.pair} and Rate: ${details.Record.rate}`} />
      </ListItem>)
    }
  });
  return (
    <div className={classes.root}>
      {console.log(data)}
      {props.data.length > 0 ?
        <List>
          {console.log('final data is', data)}
          {data}
        </List>
        : <Logo />
      }
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);