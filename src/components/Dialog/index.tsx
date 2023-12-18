import {List} from '#components/atoms';
import {useClickOutside, useEventListener, useInput} from '#hooks';
import {classNames} from '#utils/classNames';
import {memo, useEffect, useRef} from 'react';
import {GrClose, GrCube} from 'react-icons/gr';
import {DialogCurrent, useDialogContext} from './Context';
import style from './style.module.scss';

export const Dialog = memo<{ current: DialogCurrent }>(props => {
  const {
    current,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const {hide} = useDialogContext();

  const {setValue, props: inputProps} = useInput();
  const {value} = inputProps;

  const cancel = () => {
    if (!current) return;

    hide();
  };

  const ok = () => {
    hide();

    if (!current) return;

    if (current.mode === 'prompt') {
      current.callback(value);
    }

    if (current.mode === 'confirm') {
      current.callback();
    }
  };

  useEffect(() => {
    if (!current) return;
    if (current.mode !== 'prompt') return;

    setValue(current.initial);
  }, [current]);

  useEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    hide();
  });

  useEffect(() => {
    if (!inputRef.current) return;
    if (!current) return;
    if (current.mode !== 'prompt') return;

    const input = inputRef.current;

    input.focus();
  }, [current, inputRef.current]);

  useClickOutside(dialogRef, () => {
    if (!dialogRef.current) return;

    const dialog = dialogRef.current;

    if (dialog.classList.contains(style.blink1)) {
      dialog.classList.remove(style.blink1);
      dialog.classList.add(style.blink2);
    } else {
      dialog.classList.remove(style.blink2);
      dialog.classList.add(style.blink1);
    }
  });

  return (
    <div className={classNames(style.container, !current && style.hidden)}>
      {current && (
        <List vertical={true} className={style.dialog} ref={dialogRef}>
          <List className={style.header}>
            <div>
              <GrCube/>
            </div>
            <div>
              {current.title}
            </div>
            <button className={style.cross} onClick={cancel}>
              <GrClose/>
            </button>
          </List>
          <div className={style.message}>
            {current.message}
          </div>
          {current.mode === 'prompt' && (
            <input className={style.input} type={'text'} {...inputProps} ref={inputRef}/>
          )}
          <List className={style.buttons}>
            <button
              className={style.ok}
              onClick={ok}
              disabled={current.mode === 'prompt' && current.initial === value}
            >
              OK
            </button>
            <button className={style.cancel} onClick={cancel}>
              Отмена
            </button>
          </List>
        </List>
      )}
    </div>
  );
});

export * from './Context';