import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  Button,
  ButtonGroup,
  Form,
  ButtonToolbar,
  InputGroup,
  Container,
} from 'react-bootstrap';

function controlers(table, filtering, setFiltering) {
  return (
    <ButtonToolbar className="justify-content-between">
      <ButtonGroup>
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Primera
        </Button>
        <ButtonGroup className="mx-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Ultima
        </Button>
      </ButtonGroup>
      <InputGroup className="w-50">
        <Form.Control
          type="text"
          placeholder="Buscar"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </InputGroup>
    </ButtonToolbar>
  );
}

function headers(table) {
  return table.getHeaderGroups().map((hGroup) => (
    <tr key={hGroup.id}>
      {hGroup.headers.map((header) => (
        <th
          className="text-center"
          key={header.id}
          onClick={header.column.getToggleSortingHandler()}
        >
          {header.placeholder ? null : header.column.columnDef.header}
          {{ asc: '🔼', desc: '🔽' }[header.column.getIsSorted() ?? null]}
        </th>
      ))}
    </tr>
  ));
}

function body(table) {
  return table.getRowModel().rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  ));
}

export default function TableBase({ data, columns }) {
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pageSize: 15 },
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
  });

  return (
    <Container fluid>
      {controlers(table, filtering, setFiltering)}
      <Table striped hover>
        <thead>{headers(table)}</thead>
        <tbody>{body(table)}</tbody>
      </Table>
    </Container>
  );
}
