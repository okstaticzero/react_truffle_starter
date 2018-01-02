import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ripple from '../assets/images/ripple.svg';
import { getAllUsers, createAccount } from './AccountsActions';
import './Accounts.css';
import {
    Card,
    TextField,
    Button,
} from 'react-md';
import { uport, web3, MNID } from "../util/Uport";

export class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = { newAccount: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        // this.props.getAllUsers();

        const userProfile = await uport.requestCredentials({
            requested: ['name', 'country', 'avatar'],
            notifications: true // We want this if we want to recieve credentials
        })
        // Do something
        const decodedId = MNID.decode(userProfile.address)
        const specificNetworkAddress = decodedId.address
        console.log('contact: ', userProfile);
        console.log('specificNetworkAddressL ', specificNetworkAddress);
        this.props.createAccount("Matt Test", specificNetworkAddress);

    };
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newAccount === '') return;
        this.props.createAccount(this.state.newAccount);
        this.setState({ newAccount: '' });
    };
    render() {
        return (
            <div className="Account-list">
                <Card className="Accounts-card">
                    <div>
                        {this.props.accounts.userList.map((item, i) => (
                            <NavLink key={i} className="account-link" to={`todos/${item}`}>{item}</NavLink>
                        ))}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="floating-center-title"
                            label="Acount Nickname"
                            lineDirection="center"
                            placeholder="Hello World"
                            className="md-cell md-cell--bottom"
                            value={this.state.newAccount}
                            onChange={name => this.setState({ newAccount: name })}
                        />
                        {this.props.loading ? (
                            <div className="preloader">
                                <img src={ripple} className="ripple" alt="logo" />
                                <p>
                                    Waiting for transaction to complete. <br />This may take a
                  few seconds.
                </p>
                            </div>
                        ) : (
                                <Button type="submit" raised primary swapTheming>
                                    Create Todo Account
              </Button>
                            )}
                    </form>
                </Card>
            </div>
        )
    }
}

Accounts.propTypes = {
    getAllUsers: PropTypes.func,
    createAccount: PropTypes.func,
    accounts: PropTypes.object,
    loading: PropTypes.bool
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts,
        loading: state.loadingState.loading
    };
}

export default connect(mapStateToProps, {
    getAllUsers, createAccount
})(Accounts);
