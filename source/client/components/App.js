import React from 'react';
import 'static/vendor/font-awesome/css/font-awesome.min.css';
import styles from 'styles/app';
import Todo from './Todos/Todo';

const App = () => (
  <div>
    <Todo />
    <div className={styles.social}>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=flipace&repo=lovli.js&type=star&count=true"
        frameBorder="0"
        scrolling="0"
        width="85px"
        height="20px"
      />
      <iframe
        src="https://ghbtns.com/github-btn.html?user=flipace&repo=lovli.js&type=fork&count=true"
        frameBorder="0"
        scrolling="0"
        width="85px"
        height="20px"
      />
    </div>
  </div>
);

export default App;
