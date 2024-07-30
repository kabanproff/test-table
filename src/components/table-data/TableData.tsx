export const TableData = (props: {
  text?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) => <td {...props}>{props.children}</td>;
