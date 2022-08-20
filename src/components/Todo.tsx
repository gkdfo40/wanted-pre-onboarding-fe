import { useInput, useOnClickOutside } from 'hooks';
import { useRef, useState } from 'react';

import { TodoProps } from 'types';
import styles from './todo.module.css';

export function Todo({ todo, updateTodo, deleteTodo }: TodoProps) {
  const [todoValue, setTodoValue] = useState(todo);
  const modifyTodo = useInput(todo.todo);
  const [active, setActive] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  const onClickActive = () => {
    setActive((prev) => !prev);
  };

  const onClickComplete = () => {
    const newValue = { ...todoValue, isCompleted: !todoValue.isCompleted };
    setTodoValue(newValue);
    updateTodo(newValue);
  };
  const onClickUpdate = () => {
    setTodoValue({ ...todoValue, todo: modifyTodo.value });
    updateTodo({ ...todoValue, todo: modifyTodo.value });
    setActive((prev) => !prev);
  };
  const onClickDelete = () => {
    deleteTodo(todo);
  };

  useOnClickOutside(articleRef, () => setActive(false));
  return (
    <article ref={articleRef} className={styles.todoContainer}>
      {active ? (
        <input {...modifyTodo} />
      ) : (
        <span
          className={todo.isCompleted ? styles.isComplte : 'none'}
          onClick={onClickActive}
        >
          {todo.todo}
        </span>
      )}

      {active && <button onClick={onClickUpdate}>Modify</button>}
      <button onClick={onClickComplete}>Complete</button>
      <button onClick={onClickDelete}>delete</button>
    </article>
  );
}
