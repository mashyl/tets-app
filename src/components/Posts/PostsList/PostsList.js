import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Post from '../Post/Post';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import classes from './PostsList.module.css'
import { connect } from 'react-redux';
import * as postActions from '../../../store/actions/posts_actions'
import CustomModal from '../../../UI/Modal/CustomModal';
import axiosInstance from '../../../axiosInstance';

const PostsList = props => {
    const {posts, loading, error, onFetchPosts} = props;
    const userId = props.location.search.split('=')[1];

    const [showModal, setShowModal] = useState(false);
    const [addTitleVal, setAddTitleVal] = useState('');
    const [addBodyVal, setAddBodyVal] = useState('');
    const [isPostedSuccess, setIsPostedSuccess] = useState(null);

    useEffect(() => {
     onFetchPosts(userId);   
    }, [onFetchPosts, userId]);

    
    const hideModalHandler = () => {
        setShowModal(false);
        setAddTitleVal('');
        setAddBodyVal('');
    }

    const clearPostReqStatus = () => {
        setTimeout(() => {
            setIsPostedSuccess(null)
        }, 6000)
    }

    const addPostHandler = () => {
        const newPost = {
            title: addTitleVal,
            body: addBodyVal
        }
        axiosInstance.post('/posts', newPost)
            .then(response => {
                if(response.status >= 200 && response.status <= 299) {
                    setIsPostedSuccess(true);
                    clearPostReqStatus()
                } else {
                    setIsPostedSuccess(false);
                    clearPostReqStatus()
                }
            })
            .catch(err => {
                console.log(err)
                setIsPostedSuccess(false);
                clearPostReqStatus()
            })
        hideModalHandler()
    }

    const allPosts = posts.map(post => {
        return (
            <Post key={post.id} title={post.title} body={post.body} postId={post.id} />
        )
    })

    const newPostInputGroup = (
        <Fragment>
            <InputGroup style={{marginBottom: '1rem'}}>
                <InputGroup.Prepend>
                <InputGroup.Text style={{width: '56px'}}>Title</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    as="textarea" 
                    aria-label="With textarea"
                    onChange={event => setAddTitleVal(event.target.value)}
                    value={addTitleVal} />
            </InputGroup>
            <InputGroup>
                <InputGroup.Prepend>
                <InputGroup.Text style={{width: '56px'}}>Text</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    as="textarea"
                    aria-label="With textarea"
                    onChange={event => setAddBodyVal(event.target.value)}
                    value={addBodyVal} />
            </InputGroup>
        </Fragment>
    )
    
    const modal = <CustomModal 
                    show={showModal}
                    handleCancel={hideModalHandler}
                    handleConfirm={addPostHandler}
                    modalHeading='Create New Post'
                    modalBody={newPostInputGroup} />

    const alert = (
        <Alert 
            variant={isPostedSuccess 
                        ? 'success' 
                        : 'danger'}
            className={classes.Alert}>
                {isPostedSuccess ? 'Posted successfully.' : 'An error occured. Please try again.'}
        </Alert>
    )
    
    return (
        <Fragment>
            { isPostedSuccess !== null || error ? alert : null }
            {modal}
            <Button 
                variant="success" 
                className={classes.AddPost} 
                onClick={() => setShowModal(true)}
            >Add Post</Button>
            <div className={classes.Container}>
                { loading
                    ? <Spinner 
                        animation="grow" 
                        variant="primary"
                        className={classes.Status} />
                    : allPosts}
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: (userId) => dispatch(postActions.fetchPosts(userId)),
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        loading: state.posts.loading,
        error: state.posts.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PostsList));