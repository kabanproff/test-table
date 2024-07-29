export enum Text {
  Delete = 'Вы действительно хотите удалить стрку',
  Edit = 'Вы действительно хотите изменить стрку',
}

type Props = {
  text: keyof typeof Text;
  modalOpen: boolean;
  handlerConfirm: () => void;
  handlerCancel: () => void;
};

export const ModalConfirm = (props: Props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <p>{Text[props.text]}</p>
        <button onClick={props.handlerConfirm}>Да</button>
        <button onClick={props.handlerCancel}>Нет</button>
      </div>
    </div>
  );
};
