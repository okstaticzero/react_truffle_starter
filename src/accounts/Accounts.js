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
                <p>This App uses uPort for identity verification and authentication on the Blockchain. 
                    Download the uPort app on your mobile phone to create your identity. 
                    <a href="https://www.uport.me/" rel="noopener noreferrer" target="_blank">
                    https://www.uport.me/</a>
                </p>
                    <br />
                {this.props.loading ? (
                    <div className="preloader">
                        <img src={ripple} className="ripple" alt="logo" />
                        Check the uPort app on your mobile phone to approve transaction. <br />This may take a
      few seconds.

                    </div>
                ) : (
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <div><Button type="submit" raised primary swapTheming>Verify your identity</Button></div>
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
