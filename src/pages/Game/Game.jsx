import React, { Component } from "react";
import shortid from "shortid";
import Select from "react-select";
import GameTable from "../../components/GameTable/GameTable";
import styles from "./Game.module.css";

const options = [
  { value: "easyMode", label: "Easy" },
  { value: "normalMode", label: "Normal" },
  { value: "hardMode", label: "Hard" }
];

class Game extends Component {
  state = {
    level: "",
    tableChains: [],
    name: "",
    start: false,
    time: 0,
    value: "PLAY",
    randomNumber: 0,
    selectedChain: [],
    preSettings: {},
    delay: 0,
    field: 0,
    chosenOpt: {}
  };

  componentDidMount() {
    fetch("http://starnavi-frontend-test-task.herokuapp.com/game-settings")
      .then(res => res.json())
      .then(data => {
        this.setState({ preSettings: data });
      });
  }

  handleChangeSelect = opt => {
    const { value } = opt;
    const { preSettings } = this.state;
    const settings = Object.entries(preSettings);
    const choosenSet = settings.find(el => el[0] === value);

    this.setState({
      level: choosenSet[0],
      delay: choosenSet[1].delay,
      field: choosenSet[1].field,
      chosenOpt: opt
    });
  };

  handleChangeInputName = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleStartGame = e => {
    e.preventDefault();
    const { start, tableChains, field, name } = this.state;

    const formDate = {
      id: shortid.generate(),
      winner: this.handleShowWinner(tableChains),
      date: this.handleCreateDate()
    };

    if (field !== 0 && name.length > 0) {
      if (start) {
        this.finishTimer();

        this.setState({
          start: false,
          value: "PLAY",
          name: ""
        });

        fetch("http://starnavi-frontend-test-task.herokuapp.com/winners", {
          method: "POST",
          headers: {
            Accept: " */*",
            Host: "starnavi-frontend-test-task.herokuapp.com",
            "Accept-Encoding": " gzip, deflate",
            "Content-Length": "113",
            Connection: "keep-alive",
            "Postman-Token": "d84559c6-1874-482f-96ab-5ddf2c50fb28",
            "User-Agent": "PostmanRuntime/7.19.0",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formDate)
        })
          .then(response => response.json())
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.startTimer();
        this.handleReceiveTableChains();
        this.setState({
          start: true,
          value: "PLAY AGAIN",
          time: 0
        });
      }
    } else {
      alert("Please, chose one of the game's level or write down your name !");
    }
  };

  handleReceiveTableChains = () => {
    const tableChains = Array.from(document.querySelectorAll("td"));
    this.setState({ tableChains });
  };

  handleCreateDate = () => {
    let date = new Date();
    const monthes = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let chosenMonth = monthes.find((el, ind) => ind === date.getMonth());
    let chosenDay =
      String(date.getDay()).length === 1 ? ` 0${date.getDay()}` : date.getDay();
    return `${date.getHours()}:${date.getMinutes()}; ${chosenDay} ${chosenMonth} ${date.getFullYear()}`;
  };

  handleShowWinner = masOfBlocks => {
    const { name } = this.state;

    const greenBlocks = masOfBlocks.filter(el => el.bgColor === "green");
    const redBlocks = masOfBlocks.filter(el => el.bgColor === "red");

    if (greenBlocks.length > redBlocks.length) {
      return name;
    } else if (greenBlocks.length < redBlocks.length) {
      return "Computer";
    } else {
      return "";
    }
  };

  startTimer = () => {
    const tableChains = Array.from(document.querySelectorAll("td"));
    this.setState({ tableChains });

    this.id = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * tableChains.length);

      let selectBlock = tableChains.filter((el, ind) => ind === randomNumber);

      if (selectBlock[0].hasAttribute("bgColor")) {
        selectBlock[0].setAttribute("bgColor", selectBlock[0].bgColor);

        randomNumber = Math.floor(Math.random() * tableChains.length);
        selectBlock = tableChains.filter((el, ind) => ind === randomNumber);

        selectBlock[0].setAttribute("bgColor", "blue");
        this.setState(state => ({
          time: state.time + 1,
          selectedChain: selectBlock,
          randomNumber: randomNumber
        }));
      } else {
        selectBlock[0].setAttribute("bgColor", "blue");

        this.setState(state => ({
          time: state.time + 1,
          selectedChain: selectBlock,
          randomNumber: randomNumber
        }));
      }
    }, this.state.delay);
  };

  finishTimer = () => {
    clearInterval(this.id);
  };

  render() {
    const {
      value,
      name,
      time,
      start,
      selectedChain,
      field,
      chosenOpt,
      handleReceiveTableChains
    } = this.state;

    return (
      <>
        <form className={styles.form}>
          <ul className={styles.form__inner}>
            <Select
              options={options}
              value={chosenOpt}
              className={styles.pageSelect}
              onChange={this.handleChangeSelect}
            />
            <input
              type="text"
              value={name}
              placeholder=" Enter your name"
              onChange={this.handleChangeInputName}
            />
            <input type="submit" value={value} onClick={this.handleStartGame} />
          </ul>
        </form>
        {name.length > 0 ? (
          <p className={styles.game_p}>
            Your name is {name} / but always keep in mind that your competitor
            is the best player of this perfect game -{" "}
            <span className={styles.game_span}>Computer</span>
          </p>
        ) : null}
        <GameTable
          start={start}
          time={time}
          field={field}
          selectedChain={selectedChain}
          handleReceiveTableChains={handleReceiveTableChains}
        />
      </>
    );
  }
}

export default Game;
