import React from 'react';
import { connect } from 'react-redux';

import classes from './Comments.module.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Comment from './Comment/Comment';

const Comments = props => {
    const {comments, loading, error} = props;

    let commentsCards = comments.map(comment => {   
        return <Comment 
                    key={comment.id}
                    name={comment.name}
                    user={comment.email}
                    body={comment.body} />
    })

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto" className={classes.Name}>COMMENTS</Col>
            </Row>
            { loading
                    ? <Spinner 
                        animation="grow" 
                        variant="primary"
                        className={classes.Status} />
                    : error 
                    ? <Alert variant='danger'>
                            An error occured. Please try again.
                        </Alert>
                    : commentsCards}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        comments: state.posts.comments,
        error: state.posts.commentsError,
        loading: state.posts.loading
    }
}

export default connect(mapStateToProps)(Comments);