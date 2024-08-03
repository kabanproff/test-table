import React, { useState } from 'react';
import { Table } from './components/table/Table';
import { ModalConfirm } from './components/modal-confirm/ModalConfitm';
import { Data, Row } from './components/components.interfaces';
import { useGetData, getRow } from './utils/useGetData';

function App(): ReturnType<React.FC> {
  const [modalOpen, setModalOpen] = useState(false);
  const [typeConfirm, setTypeConfirm] = useState('Delete');
  const [activeRow, setActiveRow] = useState({} as Row);
  const [activeRowEditing, setActiveRowEditing] = useState(false);

  const [data, setData] = useGetData() as [
    Data,
    React.Dispatch<React.SetStateAction<Data>>,
  ];

  const addRow = () => {
    const newRow = getRow(data.columns.length, false)(null, data.rows.length);

    setData(prevData => ({
      ...prevData,
      rows: [...prevData.rows, newRow as Row],
    }));
  };

  const editRowHandler = async (row: Row) => {
    if (activeRowEditing) {
      setModalOpen(true);
      return;
    }
    setTypeConfirm('Edit');
    setActiveRow(row);
    setActiveRowEditing(true);
  };

  const deleteRowHandler = async (row: Row) => {
    setTypeConfirm('Delete');
    setActiveRow(row);
    setModalOpen(true);
  };

  const cleanState = () => {
    setActiveRowEditing(false);
    setActiveRow({} as Row);
    setModalOpen(false);
  };

  const handlerCancel = () => {
    if (activeRowEditing) {
      console.log(activeRow.cells);
      setData(prevData => {
        return {
          ...prevData,
          rows: prevData.rows.map(row => {
            console.log(row);

            if (row.id === activeRow.id) {
              console.log(row);

              return {
                ...activeRow,
              };
            }
            return row;
          }),
        };
      });
    }
    cleanState();
  };

  const handlerConfirm = () => {
    if (typeConfirm === 'Delete') {
      setData(prevData => {
        return {
          ...prevData,
          rows: prevData.rows.filter(row => row.id !== activeRow.id),
        };
      });
    }
    cleanState();
  };

  const handlerCell = (ind: number) => {
    if (!activeRowEditing) return;

    setData(prevData => ({
      ...prevData,
      rows: prevData.rows.map(row => {
        if (row.id === activeRow.id) {
          return {
            ...row,
            cells: row.cells.map((cell, i) => (i === ind ? !cell : cell)),
          };
        }
        return row;
      }),
    }));
  };

  return (
    <>
      <Table
        data={data}
        deleteRowHandler={deleteRowHandler}
        editRowHandler={editRowHandler}
        activeRowEditing={activeRowEditing}
        activeRow={activeRow}
        handlerCell={handlerCell}
      />
      {data.rows.length !== 0 && (
        <button onClick={addRow}>Добавить строку</button>
      )}
      <ModalConfirm
        handlerCancel={handlerCancel}
        handlerConfirm={handlerConfirm}
        modalOpen={modalOpen}
        order={activeRow.title}
        text={typeConfirm}
      />
    </>
  );
}

export default App;
