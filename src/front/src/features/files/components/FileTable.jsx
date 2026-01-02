import { Table } from 'react-bootstrap';

export default function FileTable({ data }) {
  return (
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
        {data &&
          data.map((d, idx) => (
            <tr key={idx}>
              <td>{d.fileName}</td>
              <td>{d.text}</td>
              <td>{d.number}</td>
              <td>{d.hex}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
