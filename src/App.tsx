/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import { hot } from "react-hot-loader/root";

type Props = {
  adjective: string;
};

class App extends React.Component<Props> {
  render(): React.ReactNode {
    const { adjective } = this.props;
    return (
      <>
        <h1>Hi, you&apos;re {adjective}</h1>
      </>
    );
  }
}

export default hot(App);
