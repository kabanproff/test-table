export interface Row {
  id: string;
  cells: boolean[];
  title: string;
}

export interface Column {
  id: string;
  title: string;
}

export interface Data {
  rows: Row[];
  columns: Column[];
}

export enum Text {
  Delete = 'Вы действительно хотите удалить',
  Edit = 'Вы действительно хотите изменить',
}
