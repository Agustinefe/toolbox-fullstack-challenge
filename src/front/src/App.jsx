import { Navbar, Container, Table } from 'react-bootstrap';

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

export default function App() {
  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand className="fw-bold">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((d, idx) => (
              <tr key={idx}>
                <td>{d.fileName}</td>
                <td>{d.text}</td>
                <td>{d.number}</td>
                <td>{d.hex}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
