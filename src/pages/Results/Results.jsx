import React, { Component } from "react";
import styles from "./Results.module.css";
import WinnerLi from "../../components/WinnerLi/WinnerLi";

class Results extends Component {
  state = { table: [] };

  componentDidMount() {
    fetch(
      fetch("http://starnavi-frontend-test-task.herokuapp.com/winners")
        .then(res => res.json())
        .then(data => {
          this.setState({ table: data });
        })
    );
  }

  render() {
    const { table } = this.state;

    return (
      <>
        <h1 className={styles.tittle}>Leader board</h1>

        <ul className={styles.list}>
          {table.map(elem => (
            <li key={elem.id} className={styles.list_item}>
              <WinnerLi name={elem.winner} date={elem.date} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Results;
