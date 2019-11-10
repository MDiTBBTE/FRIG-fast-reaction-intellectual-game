import React, { Component } from "react";
import EasyTable from "../Table/Table_5";
import NormalTable from "../Table/Table_10";
import HardTable from "../Table/Table_15";

class GameTable extends Component {
  state = {
    tableChains: [],
    selectedChain: [],
    randomNumber: 0,
    time: 0
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let { time } = prevState;

    if (time !== nextProps.time) {
      return {
        time: nextProps.time,
        selectedChain: nextProps.selectedChain
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    let { time, selectedChain } = this.state;

    if (time !== prevProps.time) {
      this.id = setInterval(() => {
        if (selectedChain[0].bgColor === "green") {
          this.setState({
            selectedChain: (selectedChain[0].bgColor = "green")
          });
        } else {
          this.setState({ selectedChain: (selectedChain[0].bgColor = "red") });
        }
      }, 1500);
    }
  }

  handleChangeColor = ({ target }) => {
    if (target.bgColor === "") {
      return null;
    } else {
      if (target.bgColor === "blue") {
        target.bgColor = "green";
      } else {
        target.bgColor = "red";
      }
    }
  };

  render() {
    let { field } = this.props;

    if (field === 15) {
      return <HardTable handleChangeColor={this.handleChangeColor} />;
    } else if (field === 10) {
      return <NormalTable handleChangeColor={this.handleChangeColor} />;
    } else if (field === 5) {
      return <EasyTable handleChangeColor={this.handleChangeColor} />;
    } else {
      return null;
    }
  }
}

export default GameTable;
