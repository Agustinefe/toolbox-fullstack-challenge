import { useToast } from '../shared/hooks/useToast';
import { useFileContext } from '../features/files/hooks/useFileContext';
import {
  Navbar,
  Container,
  Table,
  Spinner,
  Form,
  Stack,
  Placeholder,
} from 'react-bootstrap';
import { useEffect } from 'react';

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
            <Placeholder size="lg" />
          ) : (
            <Form.Select
              aria-label="Default select example"
              value={fileList.value}
              onChange={fileList.onChange}
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
              />
            </div>
          ) : (
            <Table striped bordered hover>
              <thead style={{ borderBottom: '2px solid #000' }}>
                <tr>
                  <th>File Name</th>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                {fileData.data &&
                  fileData.data.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.fileName}</td>
                      <td>{d.text}</td>
                      <td>{d.number}</td>
                      <td>{d.hex}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Stack>
      </Container>
    </>
  );
}
