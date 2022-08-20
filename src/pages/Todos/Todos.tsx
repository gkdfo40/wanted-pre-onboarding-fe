import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { ITodo } from 'types';
import { Todo } from 'components';
import { useAuth, useInput } from 'hooks';
import styles from './todos.module.css';

export function Todos() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);
  const textArea = useInput('');

  const onClickLogOut = () => {
    logout();
  };
  const createTodo = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textArea.value.length > 0) {
      try {
        const { data } = await axios.post(
          'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
          { todo: textArea.value },
          { headers: { Authorization: `Bearer ${user?.access_token}` } }
        );
        setTodos((prev) => [...prev, data]);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const updateTodo = async (updateData: ITodo) => {
    try {
      const { data } = await axios.put(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${updateData.id}`,
        { todo: updateData.todo, isCompleted: updateData.isCompleted },
        { headers: { Authorization: `Bearer ${user?.access_token}` } }
      );
      setTodos((current) =>
        current.map((obj) => {
          if (obj.id === data.id) {
            return data;
          }
          return obj;
        })
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteTodo = async (deleteData: ITodo) => {
    try {
      await axios.delete(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${deleteData.id}`,
        { headers: { Authorization: `Bearer ${user?.access_token}` } }
      );
      setTodos((prev) => prev.filter((todo) => todo.id !== deleteData.id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios({
          method: 'get',
          url: 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
          headers: { Authorization: `Bearer ${user?.access_token}` },
        })
          .then((response) => {
            console.log(response.data);
            setTodos(response.data);
          })
          .catch((err) => {
            return;
          });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.access_token]);

  return (
    <div className={styles.todoListContainer}>
      <header>
        <h2>Todos List</h2>
        <button onClick={onClickLogOut}>LogOut</button>
      </header>
      <form className={styles.createBox} onSubmit={createTodo}>
        <input type="text" placeholder="할일을 입력하세요" {...textArea} />
        <button type="submit">create</button>
      </form>
      <section className={styles.todoList}>
        {loading ? (
          <div>loading</div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <Todo
                  todo={todo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
