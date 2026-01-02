import { useToast } from '../shared/hooks/useToast';
import { useFileContext } from '../features/files/hooks/useFileContext';
import { Navbar, Container, Table, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';

const dummyData = [
  {
    fileName: 'test1.csv',
    text: 'text1',
    number: 3423423431,
    hex: 'bdt723bd3d7623bd6523df3265dv',
  },
  {
    fileName: 'test2.csv',
    text: 'text2',
    number: 3423423432,
    hex: 'bdt723bd3d7623bd6523df3265dv',
  },
];

export default function HomeScreen() {
  const { files, loading, error, reload } = useFileContext();
  const { notifyError } = useToast();

  useEffect(() => {
    if (error) {
      notifyError({ title: 'Error', content: 'Failed to load files' });
    }
  }, [error]);

  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand className="fw-bold">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        {loading ? (
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
              {files &&
                files.map((d, idx) => (
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
      </Container>
    </>
  );
}
