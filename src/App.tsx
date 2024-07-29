import React, { useEffect, useState } from 'react';
import './App.css';
import { Table } from './Table';
import { ModalConfirm, Text } from './ModalConfitm';

interface Row {
  id: string;
  cells: boolean[];
  title: string;
}

interface Column {
  id: string;
  title: string;
}

export interface Data {
  rows: Row[];
  columns: Column[];
}

function App(): ReturnType<React.FC> {
  const [data, setData] = useState<Data>({ rows: [], columns: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [typeConfirm, setTypeConfirm] = useState(Text.Delete);

  const genColls = async (colsCount: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const cols: Column[] = Array.from({ length: colsCount }, (_, i) => ({
          id: generateId(i).toString(),
          title: `Обработка ${i + 1}`,
        }));

        resolve(cols);
      }, 1500);
    });
  };

  const getRows = async (rowsCount: number, colsCount: number) => {
    return new Promise<Row[]>(resolve => {
      setTimeout(() => {
        const rows: Row[] = Array.from({ length: rowsCount }, (_, i) => ({
          id: generateId(i).toString(),
          title: `Заказ ${i + 1}`,
          cells: Array.from({ length: colsCount }, () => {
            return Math.random() > 0.5;
          }),
        }));
        resolve(rows);
      }, 1500);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getRandNums = () => Math.floor(Math.random() * 100) + 2;
  const generateId = (i: number) => new Date().getTime() + i;

  const getData = async () => {
    const randCols = getRandNums();
    const randRows = getRandNums();
    const columnsPromise = genColls(randCols);
    const rowsPromise = getRows(randRows, randCols);

    const [columns, rows] = (await Promise.all([
      columnsPromise,
      rowsPromise,
    ])) as [Column[], Row[]];
    console.log(columns, rows);

    setData({ columns, rows });
  };

  const addRow = async () => {};

  const editRow = async (rowId: string) => {
    setTypeConfirm(Text.Edit);
    setModalOpen(true);
    setData(prevData => ({
      ...prevData,
      rows: prevData.rows.map(row => {
        if (row.id === rowId) {
          return {
            ...row,
            // Todo добавить логику редактирования
            cells: [],
          };
        }
        return row;
      }),
    }));
  };

  const deleteRow = async (rowId: string) => {
    setTypeConfirm(Text.Delete);
    setModalOpen(true);
    setData(prevData => ({
      ...prevData,
      rows: prevData.rows.filter(row => row.id !== rowId.toString()),
    }));
  };

  return (
    <>
      <Table data={data} deleteRow={deleteRow} editRow={editRow} />
      <button onClick={addRow}>Добавить строку</button>

      <ModalConfirm
        handlerCancel={() => setModalOpen(false)}
        handlerConfirm={() => setModalOpen(false)}
        modalOpen={modalOpen}
        text="Edit"
      />
    </>
  );
}

export default App;
