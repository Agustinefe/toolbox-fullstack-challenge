import { render, screen, fireEvent } from '@testing-library/react';
import ToastComponent from './Toast';

describe('ToastComponent', () => {
  const defaultProps = {
    title: 'Test Title',
    message: 'Test Message',
    show: true,
    bg: 'success',
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ToastComponent {...defaultProps} />);
  });

  it('should display the title and message correctly', () => {
    render(<ToastComponent {...defaultProps} title="Custom Title" message="Custom Message"/>);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Message')).toBeInTheDocument();
  });


  it('should not render when show is false', () => {
    const { container } = render(
      <ToastComponent {...defaultProps} show={false} />
    );

    const toast = container.querySelector('.toast');
    expect(toast).toBeNull();
  });

  it('should render when show is true', () => {
    render(<ToastComponent {...defaultProps} show={true} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should apply the correct background color class', () => {
    const { container } = render(
      <ToastComponent {...defaultProps} bg="danger" />
    );
    const toast = container.querySelector('.toast');
    expect(toast).toHaveClass('bg-danger');
  });

  it('should apply success background color when bg is success', () => {
    const { container } = render(
      <ToastComponent {...defaultProps} bg="success" />
    );
    const toast = container.querySelector('.toast');
    expect(toast).toHaveClass('bg-success');
  });

  it('should have the correct inline styles', () => {
    const { container } = render(<ToastComponent {...defaultProps} />);
    const toast = container.querySelector('.toast');
    expect(toast).toHaveStyle({
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: '1000',
    });
  });

  it('should call onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<ToastComponent {...defaultProps} onClose={onCloseMock} />);
    
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
