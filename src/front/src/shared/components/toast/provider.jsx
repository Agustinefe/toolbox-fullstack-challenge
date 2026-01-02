import { createContext, useState } from 'react';
import ToastComponent from './Toast';

export const ToastContext = createContext({
  notifyError: (_) => {},
  notifySuccess: (_) => {},
});

export const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(null);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [bg, setBg] = useState(null);

  const notify = ({ title, content, bg }) => {
    setTitle(title);
    setMessage(content);
    setBg(bg);
    setShow(true);
  };

  const notifyError = ({ title, content }) => {
    notify({ title, content, bg: 'danger' });
  };

  const notifySuccess = ({ title, content }) => {
    notify({ title, content, bg: 'success' });
  };

  return (
    <ToastContext.Provider value={{ notifyError, notifySuccess }}>
      <ToastComponent
        title={title}
        message={message}
        bg={bg}
        onClose={() => setShow(false)}
        show={show}
      />
      {children}
    </ToastContext.Provider>
  );
};
