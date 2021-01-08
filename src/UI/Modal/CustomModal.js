import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = props => {
  const {show, handleCancel, handleConfirm, modalBody, modalHeading, isDeleting} = props;

  return (
    <>
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant={isDeleting ? 'danger' : 'primary'} onClick={handleConfirm}>
            {isDeleting ? 'Delete' : 'Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;