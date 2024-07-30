import { useEffect, useState } from 'react';
import { Column, Data, Row } from '../components/components.interfaces';

const getRandNums = () => {
  const rand = Math.floor(Math.random() * 100) + 2;
  if (rand > 100) return 100;
  return rand;
};
const generateId = (i: number) => new Date().getTime() + i;

const getRows = async (rowsCount: number, colsCount: number) => {
  return new Promise<Row[]>(resolve => {
    setTimeout(() => {
      const rows: Row[] = Array.from(
        { length: rowsCount },
        getRow(colsCount, true),
      );
      resolve(rows);
    }, 1500);
  });
};

export const getRow = (colsCount: number, bools?: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (_: any, i: number) => ({
    id: generateId(i).toString(),
    title: `Заказ ${i + 1}`,
    cells: Array.from({ length: colsCount }, () => {
      return bools && Math.random() > 0.5;
    }),
  });
};

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

export const useGetData = () => {
  const [data, setData] = useState<Data>({ rows: [], columns: [] });
  const randCols = getRandNums();
  const randRows = getRandNums();
  const columnsPromise = genColls(randCols);
  const rowsPromise = getRows(randRows, randCols);

  useEffect(() => {
    Promise.all([columnsPromise as Promise<Column[]>, rowsPromise]).then(
      ([columns, rows]: [Column[], Row[]]) => {
        setData({ columns, rows });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, setData];
};
