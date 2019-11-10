import React, { lazy, Suspense } from "react";
import { Switch, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./pages/Home/Home";

const App = () => {
  const Game = lazy(() => import("./pages/Game/Game"));
  const Results = lazy(() => import("./pages/Results/Results"));
  return (
    <>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.nav__inner__item}>
            <Link className={styles.nav__inner__link} to="/">
              Home
            </Link>
          </li>
          <li className={styles.nav__inner__item}>
            <Link className={styles.nav__inner__link} to="/game">
              Game
            </Link>
          </li>
          <li className={styles.nav__inner__item}>
            <Link className={styles.nav__inner__link} to="/results-game">
              Results
            </Link>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<h1>Loader ...</h1>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/game" exact component={Game} />
          <Route path="/results-game" exact component={Results} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
