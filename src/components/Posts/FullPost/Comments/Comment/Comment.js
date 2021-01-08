import React, { useState } from 'react';

import classes from './Comment.module.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Comment = props => {
    const {name, user, body} = props;
    let variant = 'light';

    const shortText = body.split(' ').filter((word, idx) => idx < 6).join(' ');
    const expand = shortText.length < body.length;

    const [showFull, setShowFull] = useState(expand ? false : true);

    return (
        <Row className={'justify-content-md-center ' + classes.SingleComment} style={{ width: '90%' }} >
                <Col md="auto" style={{width: '100%'}}>
                    <Card
                        bg={variant.toLowerCase()}
                        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                        style={{ width: '100%' }}
                        className={'mb-2 '}
                    >
                        <Card.Header>{'comment by ' + user}</Card.Header>
                        <Card.Body>
                        <Card.Title>{name} </Card.Title>
                        <Card.Text>
                            {showFull ? body : (shortText + '...')}
                        </Card.Text>
                        <Button 
                            variant={showFull ? 'secondary' : 'primary'} 
                            disabled={!expand} 
                            onClick={() => {
                                setShowFull(!showFull)
                            }} 
                        >{showFull ? 'Less' : 'More'}</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    )
}

export default Comment;