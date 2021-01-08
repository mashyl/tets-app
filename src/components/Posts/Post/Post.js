import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router';

import classes from './Post.module.css';
import { connect } from 'react-redux';
import * as postsActions from '../../../store/actions/posts_actions';

const Post = props => {
    const {postId, title, body, onStoreSelectedPost} = props;

    const showFullPostHandler = (postId) => {
        onStoreSelectedPost(title, body);
        props.history.push('/comments?postId=' + postId)
    }

    const titleShort = title.split(' ').filter( (word, idx) => idx < 7).join(' ');

    const text = body.split(' ').filter( (word, idx) => idx < 6).join(' ');

    return (
        <Card className={classes.CardContainer}>
            <Card.Body>
                <Card.Title>{titleShort}{titleShort.length < title.length ? '...' : null}</Card.Title>
                <Card.Text>{text}{text.length < body.length ? '...' : null}</Card.Text>
                <Button variant="primary" onClick={() => showFullPostHandler(postId)} >DETAILS</Button>
            </Card.Body>
        </Card>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onStoreSelectedPost: (title, body) => dispatch(postsActions.storeSeletcedPost(title, body))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Post));