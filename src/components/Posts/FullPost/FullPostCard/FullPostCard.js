import React from 'react';
import classes from './FullPostCard.module.css';

import {ReactComponent as EditIcon} from '../../../../assets/svg/edit.svg';
import {ReactComponent as DeleteIcon} from '../../../../assets/svg/delete.svg';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import { Fragment } from 'react';
import CustomModal from '../../../../UI/Modal/CustomModal';
import axiosInstance from '../../../../axiosInstance';
import { useState } from 'react';

const FullPostCard  = props => {
    let selectedPost = JSON.parse(localStorage.getItem('selectedPost')); 
    const [isPostedSuccess, setIsPostedSuccess] = useState(null);
    const [isDeletedSuccess, setIsDeletedSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editedPost, setEditedPost] = useState({
        title: selectedPost.title,
        body: selectedPost.body
    });
    const [isDeleting, setIsDeleting] = useState(false);
    
    const clearPostReqStatus = () => {
        setTimeout(() => {
            setIsPostedSuccess(null);
        }, 6000)
    }

    const deletePostHandler = (postId) => {
        axiosInstance.delete('/posts/' + postId)
            .then(response => {
                if(response.status >= 200 && response.status <= 299) {
                    setIsDeletedSuccess(true);
                    const postDisplay = {
                        title: 'Post was deleted.',
                        body: null
                    }
                    localStorage.setItem('selectedPost', JSON.stringify(postDisplay));
                    selectedPost = JSON.parse(localStorage.getItem('selectedPost'));
                    setEditedPost({
                        title: selectedPost.title,
                        body: null
                    });
                } else {
                    setIsDeletedSuccess(false);
                }
            })
            .catch(err => {
                console.log(err)
                setIsDeletedSuccess(false);
            })
        hideModalHandler(true)

    }

    const editPostHandler = (postId) => {
        const data = {
            title: editedPost.title,
            body: editedPost.body
        }
        localStorage.setItem('selectedPost', JSON.stringify(data));
        axiosInstance.put('/posts/' + postId, data)
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
        hideModalHandler(true)
    }

    const hideModalHandler = (saveEdit = false) => {
        if (saveEdit === true) {
            setShowModal(false);
        } else {
            setShowModal(false);
            setEditedPost({
                title: selectedPost.title,
                body: selectedPost.body
            })
        }
    }

        const alert = (
            <Alert 
                variant={isPostedSuccess ? 'success' : 'warning'}
                className={classes.Alert}>
                    {isPostedSuccess 
                    ? 'Edited successfully.'
                    : isDeletedSuccess
                        ? 'Deleted successfully.'
                        : 'An error occured. Please try again later.'}
            </Alert>
        )
    
        const newPostInputGroup = (
            <Fragment>
                <InputGroup style={{marginBottom: '1rem'}}>
                    <InputGroup.Prepend>
                    <InputGroup.Text style={{width: '56px'}}>Title</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                        as="textarea" 
                        aria-label="With textarea"
                        onChange={event => setEditedPost({...editedPost, title: event.target.value})}
                        value={editedPost.title}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text style={{width: '56px'}}>Text</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                        as="textarea"
                        aria-label="With textarea"
                        onChange={event => setEditedPost({...editedPost, body: event.target.value})}
                        value={editedPost.body} 
                    />
                </InputGroup>
            </Fragment>
        )

        const deleteQuestion = (
            <Jumbotron fluid>
                <Container>
                    <h1>Are you sure you want to delete the post?</h1>
                </Container>
            </Jumbotron>
        )
    
        const modal = <CustomModal 
                        show={showModal}
                        handleCancel={hideModalHandler}
                        handleConfirm={() => {
                            return isDeleting 
                            ? deletePostHandler(props.postId)
                            : editPostHandler(props.postId)}
                        } 
                        modalHeading= { isDeleting ? 'Delete post' : 'Edit Post'}
                        modalBody={ isDeleting ? deleteQuestion : newPostInputGroup}
                        isDeleting={isDeleting} />
    
        return (
            <Fragment>
                {modal}
                {isPostedSuccess !== null || isDeletedSuccess !== null 
                ? alert : null}
                <Card className={classes.CardContainer}>
                    <Card.Body>
                        <Card.Title>{editedPost.title}</Card.Title>
                        <Card.Text>{editedPost.body}</Card.Text>
                        {isDeletedSuccess
                        ? null
                        : <div className={classes.Buttons}>
                            <Button 
                                variant="info" 
                                className={classes.Button}
                                onClick={() => {
                                    setIsDeleting(false)
                                    setShowModal(true)
                                }}
                            ><EditIcon className={classes.Icon}/></Button>
                            <Button 
                                variant="danger" 
                                className={classes.Button} 
                                onClick={() => {
                                    setIsDeleting(true);
                                    setShowModal(true);
                                }}
                            ><DeleteIcon className={classes.Icon}/></Button>
                        </div>
                        }
                    </Card.Body>
                </Card>
            </Fragment>
        )
}

export default React.memo(FullPostCard);