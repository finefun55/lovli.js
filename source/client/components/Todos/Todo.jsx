import React from 'react';
import Logo from '../Logo';
import TodoList from './TodoList';
import AddTodoButton from './AddTodoButton';
import styles from 'styles/app';
import todoStyles from './styles';

export default class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'order',
      data: {
        _id: Date.now(),
        page: 'above',
        limit: 3,
        direction: 'ascending',
        orderName: 'createTime'
      }
    };

    this.todos = [];
    this.setTodos = this.setTodos.bind(this);
  }

  setTodos(todos) {
    this.todos = todos;
  }

  static getLastAndFirst(todos) {
    const obj = {
      last: 0,
      first: todos[0] ? todos[0].createTime : 0
    };
    const result = todos.reduce((pre, cur) => {
      const createTime = cur.createTime;
      const { last, first } = pre;
      return {
        last: createTime > last ? createTime : last,
        first: createTime < first ? createTime : first
      };
    }, obj);
    if (result.first === 0){
      result.first = result.last;
    }
    return result;
  }

  sortBy(key = 'text') {
    return () => {
      this.setTodos([]);
      const { orderName, direction } = this.state.data;
      this.setState(Object.assign({}, this.state, {
        type: 'order',
        data: Object.assign({}, this.state.data, {
          orderName: key,
          direction: orderName === key ? Todo.toggledDirection(direction) : 'ascending'
        })
      }));
    };
  }

  static toggledDirection(direction) {
    return direction === 'ascending' ? 'descending' : 'ascending';
  }

  page(page = 'above') {
    return () => {
      this.setState(Object.assign({}, this.state, {
        type: page,
        data: Object.assign({}, this.state.data, {
          page,
          _id: Date.now(),
          direction: page === 'above' ? 'ascending' : 'descending'
        })
      }));
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <Logo />
        <p className={styles.tCenter}>
          <b>Welcome.</b>
          <br />
          You're connected to <a href="https://github.com/rethinkdb/horizon"
            target="_blank"
          >horizon</a>.
        </p>
        <div className={todoStyles.handerWarp}>
          <div
            className={todoStyles.handler}
            onClick={this.sortBy('text')}
          >
            name
          </div>
          <div
            className={todoStyles.handler}
            onClick={this.sortBy('createTime')}
          >
            time
          </div>
        </div>
        <TodoList
          {...this.state}
          lastAndFirst={Todo.getLastAndFirst(this.todos)}
          setTodos={this.setTodos}
        />
        <div className={todoStyles.handerWarp}>
          <div
            className={todoStyles.handler}
            onClick={this.page('below')}
          >
            {'<'}
          </div>
          <div
            className={todoStyles.handler}
            onClick={this.page('above')}
          >
            {'>'}
          </div>
        </div>
        <AddTodoButton />
        <div className={styles.footer}>
          ToDos are deleted automatically every 10 minutes.
          <br /><br />
          built with <i className="fa fa-heart" /> by <a href="https://github.com/flipace"
            target="_blank"
          >@flipace</a>
        </div>
      </div>
    );
  }
}
