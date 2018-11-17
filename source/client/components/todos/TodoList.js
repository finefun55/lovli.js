import React from 'react';
import { subscribe } from 'horizon-react';
import equal from 'fast-deep-equal';

import TodoItem from './TodoItem';

import styles from './styles';

const map = {
  order: (hz, { limit, orderName, direction }) => {
    return hz('todos').order(orderName, direction).limit(limit);
  },
  above:(hz, { page, limit, direction }, lastAndFirst) => {
    return hz('todos').order('createTime', direction)[page]({
      createTime: lastAndFirst.last
    }, 'open').limit(limit);
  },
  below:(hz, { page, limit, direction }, lastAndFirst) => {
    return hz('todos').order('createTime', direction)[page]({
      createTime: lastAndFirst.first
    }, 'open').limit(limit);
  }
};

const mapDataToProps = {
  todos: (hz, { type, data, lastAndFirst }) => {
    return map[type](hz, data, lastAndFirst);
  }
};


class TodoList extends React.Component {

  shouldComponentUpdate(nextProps) {
    const todos = nextProps.todos;
    return !(todos.length === 0 || equal(this.props.todos, todos));
  }

  render() {
    const { todos, setTodos, horizon } = this.props;
    const length = todos.length;
    setTodos(todos);

    return (
      <ul className={styles.list} style={{ height: length * 49 }}>
        {todos.sort((pre, last) => pre.createTime - last.createTime).map(
          todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              horizon={horizon}
            />
          )
        )}
      </ul>
    );
  }
}

export default subscribe({
  mapDataToProps,
  // you can connect to redux state too
  mapStateToProps:(state, props) => {
    return props;
  }
})(TodoList);
