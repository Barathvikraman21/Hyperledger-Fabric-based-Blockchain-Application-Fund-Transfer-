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

class CreateBank extends React.Component {
    state = {
        bankID: null,
        country: null,
        currency: null,
        name: null,
        reserves: null
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createHandler = () => {
        //Check form validity
        if (!(this.state.bankID && this.state.country && this.state.currency && this.state.name && this.state.reserves)) {
            alert('All fields must be filled in');
        } else {
            this.props.switchFeedHandler(1);
            this.props.socket.emit('REQUEST', { action: "CREATEBANK", data: this.state });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form className="Main-inside" noValidate autoComplete="off">
                <Typography variant="display2">
                    Create a Bank
        </Typography>
                <TextField
                    label="BANK ID"
                    className={classes.textField}
                    value={this.state.bankID}
                    onChange={this.handleChange('bankID')}
                    margin="normal"
                />
                <TextField
                    label="COUNTRY"
                    className={classes.textField}
                    value={this.state.country}
                    onChange={this.handleChange('bcountry')}
                    margin="normal"
                />
                <TextField
                    label="CURRENCY"
                    className={classes.textField}
                    value={this.state.currency}
                    onChange={this.handleChange('bcurrency')}
                    margin="normal"
                />
                <TextField
                    label="BANK NAME"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('bname')}
                    margin="normal"
                />
                <TextField
                    label="RESERVES"
                    className={classes.textField}
                    value={this.state.reserves}
                    onChange={this.handleChange('reserves')}
                    margin="normal"
                />
                <Button variant="contained"
                    color="primary"
                    disabled={!this.props.connected}
                    className={classes.button}
                    onClick={this.createHandler}>
                    {this.props.connected ? "CREATE BANK" : "DISCONNECTED"}
                </Button>
                <p>Bank ID is case sensitive</p>
            </form>

        );
    }
}


export default withStyles(styles)(CreateBank);