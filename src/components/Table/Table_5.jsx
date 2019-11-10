import React, { Component } from "react";
import styles from "../Table/Table.module.css";

class Table extends Component {
  render() {
    return (
      <table onClick={this.props.handleChangeColor}>
        <tbody>
          <tr className={styles.chessboard}>
            <td className={styles.chessboard1}></td>
            <td className={styles.chessboard2}></td>
            <td className={styles.chessboard3}></td>
            <td className={styles.chessboard4}></td>
            <td className={styles.chessboard5}></td>
          </tr>
          <tr className={styles.chessboard}>
            <td className={styles.chessboard6}></td>
            <td className={styles.chessboard7}></td>
            <td className={styles.chessboard8}></td>
            <td className={styles.chessboard9}></td>
            <td className={styles.chessboard10}></td>
          </tr>
          <tr className={styles.chessboard}>
            <td className={styles.chessboard11}></td>
            <td className={styles.chessboard12}></td>
            <td className={styles.chessboard13}></td>
            <td className={styles.chessboard14}></td>
            <td className={styles.chessboard15}></td>
          </tr>
          <tr className={styles.chessboard}>
            <td className={styles.chessboard16}></td>
            <td className={styles.chessboard17}></td>
            <td className={styles.chessboard18}></td>
            <td className={styles.chessboard19}></td>
            <td className={styles.chessboard20}></td>
          </tr>
          <tr className={styles.chessboard}>
            <td className={styles.chessboard21}></td>
            <td className={styles.chessboard22}></td>
            <td className={styles.chessboard23}></td>
            <td className={styles.chessboard24}></td>
            <td className={styles.chessboard25}></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;
