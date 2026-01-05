import { useToast } from '../shared/hooks/useToast';
import { useFileContext } from '../features/files/hooks/useFileContext';
import {
  Navbar,
  Container,
  Spinner,
  Form,
  Stack,
  Placeholder,
} from 'react-bootstrap';
import { useEffect } from 'react';
import FileTable from '../features/files/components/FileTable';

export default function HomeScreen() {
  const { fileData, fileList } = useFileContext();
  const { notifyError } = useToast();

  useEffect(() => {
    if (fileData.error) {
      notifyError({
        title: 'Error',
        content:
          fileData.error.status === 404
            ? 'File not found'
            : fileData.error.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData.error]);

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand className="fw-bold">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <Stack gap={4}>
          {fileList.loading ? (
            <Placeholder size="lg" data-testid="loading-file-list" />
          ) : (
            <Form.Select
              aria-label="Filename select"
              value={fileList.value}
              onChange={fileList.onChange}
              disabled={fileList.error}
            >
              {fileList.data &&
                fileList.data.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </Form.Select>
          )}
          {fileData.loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '70vh',
              }}
            >
              <Spinner
                animation="border"
                style={{ width: '4rem', height: '4rem' }}
                data-testid="loading-file-data"
              />
            </div>
          ) : (
            <FileTable data={fileData.data} />
          )}
        </Stack>
      </Container>
    </>
  );
}
