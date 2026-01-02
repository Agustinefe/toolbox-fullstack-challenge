import { Toast } from 'react-bootstrap';

export default function ToastComponent({ title, message, onClose, show, bg }) {
  return (
    <Toast
      style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
      bg={bg}
      onClose={onClose}
      show={show}
      delay={7000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body className={'text-white'}>{message}</Toast.Body>
    </Toast>
  );
}
