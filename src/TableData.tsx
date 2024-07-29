export const TableData = ({
  text,
  classNames,
}: {
  text?: string;
  classNames?: string;
}) => {
  console.log(text, classNames);

  return <td className={classNames}>{text}</td>;
};
