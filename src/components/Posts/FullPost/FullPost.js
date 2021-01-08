import React, { Fragment, useEffect } from 'react';
import classes from './FullPost.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as postsActions from '../../../store/actions/posts_actions';
import Comments from './Comments/Comments';
import FullPostCard from './FullPostCard/FullPostCard';

const FullPost = props => {
    const selectedPostId = props.history.location.search.split('=')[1];
    const {onFetchComments} = props;

    useEffect(() => {
        onFetchComments(selectedPostId);
    }, [onFetchComments, selectedPostId])


    return (
        <Fragment>
            <div className={classes.Container}>
                <FullPostCard 
                    postId={selectedPostId}
                 />
            </div>
            <Comments />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        selectedPost: state.posts.selectedPost,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchComments: (id) => dispatch(postsActions.fetchComments(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FullPost));