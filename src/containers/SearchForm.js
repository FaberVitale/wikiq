//@flow
import * as React from "react";
import { LOCALES } from "../config";
import { withRouter } from "react-router-dom";
import { withHandlers, compose } from "recompose";
import { makeSearchId } from "../util/query";

const submit = (push: (urlSegment: string) => void) => (
  index: number,
  query: string
) => push(makeSearchId(LOCALES[index], query));

const addSubmit = withHandlers({
  submit: ({ history }) => submit(history.push)
});

type State = {
  index: number,
  input: string
};

//props passed to the view component
export type ViewProps = {
  state: State,
  options: Array<string>,
  handlers: {
    inputChange: (evt: SyntheticInputEvent<*>) => void,
    selectChange: (evt: SyntheticInputEvent<*>) => void,
    clear: (evt: mixed) => void,
    submit: (evt: mixed) => void
  }
};

type Props = {
  submit: (index: number, input: string) => void,
  view: React.ComponentType<ViewProps>
};

class FormState extends React.Component<Props, State> {
  state = {
    index: 0,
    input: ""
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const hasStateChanged =
      nextState.index !== this.state.index ||
      nextState.input !== this.state.index;

    const haveRelevantPropsChanged =
      nextProps.view !== this.props.view ||
      nextProps.submit !== this.props.submit;

    return hasStateChanged || haveRelevantPropsChanged;
  }

  handleSelectChange = (evt: SyntheticInputEvent<*>) => {
    const num = parseInt(evt.target.value, 10);

    if (num < 0 || num >= LOCALES.length || this.state.index === num) {
      return;
    }

    this.setState({
      index: num
    });
  };

  handleInputChange = (evt: SyntheticInputEvent<*>) => {
    const nextInput = evt.target.value;

    if (this.state.input === nextInput) {
      return;
    }

    this.setState({
      input: nextInput
    });
  };

  handleClear = (evt: mixed) => {
    if (this.state.input) {
      this.setState({
        input: ""
      });
    }
  };

  handleSubmit = () => {
    // remove trailing and leading ws
    const text = this.state.input.trim();

    // users have to input at least one non ws character
    if (text.length > 0) {
      this.props.submit(this.state.index, this.state.input);
    }
  };

  handlers = {
    inputChange: this.handleInputChange,
    clear: this.handleClear,
    selectChange: this.handleSelectChange,
    submit: this.handleSubmit
  };

  render() {
    const viewProps: ViewProps = {
      state: { ...this.state },
      options: LOCALES,
      handlers: this.handlers
    };

    return React.createElement(this.props.view, viewProps);
  }
}

export default compose(withRouter, addSubmit)(FormState);
