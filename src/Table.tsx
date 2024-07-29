import React from 'react';
import { Data } from './App';
import { TableData } from './TableData';

export const Table = ({
  data,
  deleteRow,
  editRow,
}: {
  data: Data;
  deleteRow: (rowId: string) => void;
  editRow: (rowId: string) => void;
}) => {
  console.log(data);

  return (
    <table>
      <thead>
        <tr>
          <th className="vertical-rytmic"></th>
          {data.columns.map(column => (
            <th key={column.id} className="vertical-rytmic">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map(row => {
          console.log(row.id, row);
          return (
            <tr key={row.title + row.id}>
              {row.cells.map((cell, ind) =>
                ind ? (
                  <TableData
                    key={row.title + row.id + ind}
                    classNames={cell ? 'green' : 'red'}
                  />
                ) : (
                  <React.Fragment key={row.title + row.id + ind}>
                    <TableData text={row.title} />
                    <TableData classNames={cell ? 'green' : 'red'} />
                  </React.Fragment>
                ),
              )}
              <td>
                <button onClick={() => editRow(row.id)}>Редактировать</button>
                <button onClick={() => deleteRow(row.id)}>Удалить</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
