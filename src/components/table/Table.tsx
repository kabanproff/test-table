import React from 'react';
import { TableData } from '../table-data/TableData';
import EditIcon from '../../assets/edit.svg?react';
import DeleteIcon from '../../assets/delete.svg?react';
import CheckIcon from '../../assets/check.svg?react';
import { Data, Row } from '../components.interfaces';
import './table.css';

export const Table = ({
  data,
  deleteRowHandler,
  editRowHandler,
  activeRow,
  activeRowEditing,
  handlerCell,
}: {
  data: Data;
  deleteRowHandler: (row: Row) => void;
  editRowHandler: (row: Row) => void;
  activeRow: Row;
  activeRowEditing: boolean;
  handlerCell: (ind: number) => void;
}) => {
  return (
    <table className={activeRowEditing ? 'editionIsActive' : ''}>
      <thead>
        <tr>
          <th></th>
          {data.columns.map(column => (
            <th key={column.id}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map(row => (
          <tr
            key={row.title + row.id}
            className={activeRow.id === row.id ? 'rowIsEdition' : ''}
          >
            {row.cells.map((cell, ind) =>
              ind ? (
                <TableData
                  key={row.title + row.id + ind}
                  className={cell ? 'green' : 'red'}
                  onClick={() => handlerCell(ind)}
                />
              ) : (
                <React.Fragment key={row.title + row.id + ind}>
                  <TableData className="interface-cell">
                    <button
                      className="interface-btn"
                      onClick={() => editRowHandler(row)}
                    >
                      {activeRowEditing ? (
                        <CheckIcon width={15} height={15} />
                      ) : (
                        <EditIcon width={15} height={15} />
                      )}
                    </button>
                    <div className="row-title">{row.title}</div>
                    <button
                      className="interface-btn"
                      onClick={() => deleteRowHandler(row)}
                    >
                      <DeleteIcon width={20} height={20} />
                    </button>
                  </TableData>
                  <TableData
                    className={cell ? 'green' : 'red'}
                    onClick={() => handlerCell(ind)}
                  />
                </React.Fragment>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
