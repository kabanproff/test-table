import styles from './modalConfirm.module.css';
import { Text } from '../components.interfaces.ts';

type Props = {
  text: keyof typeof Text;
  order?: string;
  modalOpen: boolean;
  handlerConfirm: () => void;
  handlerCancel: () => void;
};

export const ModalConfirm = (props: Props) => {
  return (
    <div
      className={[styles.modal, props.modalOpen ? styles.open : ''].join(' ')}
    >
      <div className={styles.modal__content}>
        <span onClick={props.handlerCancel} className={styles.modal__close}>
          &times;
        </span>
        <p>
          {Text[props.text]}
          <br />
          {props.order}
        </p>
        <button onClick={props.handlerConfirm}>Да</button>
        <button onClick={props.handlerCancel}>Нет</button>
      </div>
    </div>
  );
};
