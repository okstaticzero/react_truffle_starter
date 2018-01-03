import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ripple from '../assets/images/ripple.svg';
import { getAllUsers, createAccount } from './AccountsActions';
import './Accounts.css';
import {
    Button,
} from 'react-md';
import { initAccount } from "../util/Uport";

export class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = { newAccount: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(e) {
        e.preventDefault();
        const indentiy = await initAccount();
        this.props.createAccount("Test Account", indentiy.specificNetworkAddress, indentiy.userProfile);
    };
    render() {
        return (
            <div className="Account-list">
                {this.props.loading ? (
                    <div className="preloader">
                        <img src={ripple} className="ripple" alt="logo" />
                        Waiting for transaction to complete. <br />This may take a
      few seconds.

                    </div>
                ) : (
                        <form onSubmit={this.handleSubmit}>
                            <div><Button type="submit" raised primary swapTheming>Login</Button></div>
                        </form>
                    )
                }
            </div>
        )
    }
}

Accounts.propTypes = {
    createAccount: PropTypes.func,
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
