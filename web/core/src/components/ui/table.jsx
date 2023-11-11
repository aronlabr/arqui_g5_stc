'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Table, Button, ButtonGroup, Form } from 'react-bootstrap';

const columnsEx = [
  {
    header: '',
    accesorKey: '',
  },
];

function headers(table) {
  return table.getHeaderGroups().map((hGroup) => (
    <tr key={hGroup.id}>
      {hGroup.headers.map((header) => (
        <th
          key={header.id}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
        >
          {header.column.columnDef.header}
        </th>
      ))}
    </tr>
  ));
}

function body(table) {
  return;
}

export default function TableBase({ data, columns }) {
  const [filtering, setFiltering] = useState('');
  const table = useReactTable({
    data,
    columns,
    // columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // state: { globalFilter: filtering },
  });

  return (
    <>
      <div>
        <Button onClick={() => table.setPageIndex()}>Primera</Button>
        <ButtonGroup className="ms-2 me-2">
          <Button onClick={() => table.previousPage()}>Anterior</Button>
          <Button onClick={() => table.nextPage()}>Siguiente</Button>
        </ButtonGroup>
        <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Ultima
        </Button>
        <Form.Control
          type="text"
          placeholder="Buscar"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <Table striped bordered hover>
        <thead>{headers(table)}</thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
