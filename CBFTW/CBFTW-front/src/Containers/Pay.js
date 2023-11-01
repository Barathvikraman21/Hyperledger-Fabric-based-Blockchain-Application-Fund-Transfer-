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

class Pay extends React.Component {
    state = {
        fromUserID: null,
        toUserID: null,
        amount: null
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createHandler = () => {
        //Check form validity
        if (!(this.state.fromUserID && this.state.toUserID && this.state.amount)) {
            alert('All fields must be filled in');
        } else {
            console.log(this.state);
            this.props.switchFeedHandler(1);
            this.props.socket.emit('REQUEST', { action: "PAY", data: this.state });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form className="Main-inside" noValidate autoComplete="off">
                <Typography variant="display2">
                    Pay between any Two Customers
        </Typography>
                <TextField
                    label="FROM USER ID"
                    className={classes.textField}
                    value={this.state.fromUserID}
                    onChange={this.handleChange('fromUserID')}
                    margin="normal"
                />
                <TextField
                    label="TO USER ID"
                    className={classes.textField}
                    value={this.state.toUserID}
                    onChange={this.handleChange('toUserID')}
                    margin="normal"
                />
                <TextField
                    label="AMOUNT"
                    className={classes.textField}
                    value={this.state.amount}
                    onChange={this.handleChange('amount')}
                    margin="normal"
                />
                <Button variant="contained"
                    color="primary"
                    disabled={!this.props.connected}
                    className={classes.button}
                    onClick={this.createHandler}>
                    {this.props.connected ? "PAY" : "DISCONNECTED"}
                </Button>
                <p>Pay from one user to another</p>
            </form>

        );
    }
}


export default withStyles(styles)(Pay);