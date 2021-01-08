//render table with table head
//render table rows dynamically - create talerow component
//each row has button POSTS for redirect
//turn off dark mode

import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'

import * as usersActions from '../../store/actions/users_actions';
import classes from './Users.module.css';
import { Fragment } from 'react';

const Users = props => {
    const {onFetchUsers, users, loading, error} = props
    useEffect(() => {
        onFetchUsers();
    }, [onFetchUsers]);

    const showUserPostsHandler = (id) => {
        props.history.push('/posts?userId=' + id)
    }

    const usersRender = users.map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td><Button variant="primary" onClick={() => showUserPostsHandler(user.id)}>POSTS</Button></td>
            </tr>
        )
    })

    return (
        <Fragment>
            {error
                ? <Alert variant='danger' className={classes.Alert}>
                        An error occured. Please, try again.
                    </Alert>
                : null
            }
            <Table striped bordered hover variant="dark" style={{minHeight: '100vh'}}>
                <thead>
                    <tr>
                        {loading
                        ? <th>Loading...</th>
                        : <Fragment>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>See User's Posts</th>
                        </Fragment>
                        }
                    </tr>
                </thead>
                <tbody className={loading ? classes.Loader : null}>
                    { loading 
                    ? <Spinner 
                        animation="grow" 
                        variant="primary"
                        className={classes.Status} />
                    : usersRender}
                </tbody>
            </Table>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        loading: state.users.loading,
        error: state.users.err
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(usersActions.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users));