import TableBase from '@components/ui/table';
import data from './MOCK_DATA.json';

/*
{"id":1,
"cliente":"Elvin Cracknall",
"direccion":"16th Floor",
"estado":"ecracknall0@msn.com",
"telefono":"495-597-8572",
"descripcion_prob":"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
"visita":"04/10/2023"}
*/

export default function Page() {
  const columns = [
    {
      header: 'ID',
      accesorKey: 'id',
    },
    {
      header: 'Cliente',
      accesorKey: 'cliente',
    },
    {
      header: 'Estado',
      accesorKey: 'estado',
    },
    {
      header: 'Contacto',
      accesorKey: 'telefono',
    },
    {
      header: 'Agenda de Visita',
      accesorKey: 'visita',
    },
    {
      header: 'Dir',
      accesorKey: 'direccion',
    },
    {
      header: 'Prob',
      accesorKey: 'descripcion_prob',
    },
  ];
  return (
    <>
      <div>Lista de Incidencias</div>
      <TableBase data={data.slice(0, 10)} columns={columns} />
    </>
  );
}
