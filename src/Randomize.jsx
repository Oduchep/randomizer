import React, { Component } from "react";

import "./App.css";

let counter = 1;
const generateAnswer = () => {
  return { id: counter++, value: "" };
};

const generateAlpha = (num) => String.fromCharCode(65 + num); // String.fromCharCode

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answer: null,
      possibleAnswers: [generateAnswer(), generateAnswer(), generateAnswer()],
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleOptionChange(updatedOption, value) {
    const possibleAnswers = this.state.possibleAnswers.map((option) => {
      if (updatedOption.id === option.id) {
        option = { ...option, value }; // object spread
      }
      return option;
    });

    this.setState({ possibleAnswers });
  }

  handleQuestionChange(question) {
    // this.setState({ question: question });
    this.setState({ question });
  }

  handleAddOption() {
    const answers = this.state.possibleAnswers;
    const possibleAnswers = [...answers, generateAnswer()]; // array spread
    this.setState({ possibleAnswers });
  }

  handleAnswer() {
    const { possibleAnswers } = this.state;
    const numOfAnswers = possibleAnswers.length;
    const randomAnswer = Math.floor(Math.random() * numOfAnswers + 1);

    this.setState({ answer: possibleAnswers[randomAnswer] });
  }

  resetState() {
    counter = 0;
    this.setState({
      question: "",
      answer: null,
      possibleAnswers: [generateAnswer(), generateAnswer(), generateAnswer()],
    });
  }

  render() {
    let renderElements = "";
    const {
      handleOptionChange,
      handleQuestionChange,
      handleAddOption,
      handleAnswer,
      resetState,
    } = this;
    const { possibleAnswers, answer, question } = this.state; // object destructring

    if (answer !== null) {
      renderElements = (
        <React.Fragment>
          <div className="forms">
            <p>{question}</p>
            <ul style={{ listStyle: "upper-alpha" }}>
              {possibleAnswers.map((option /* {id, value} */) => {
                return (
                  <li
                    key={option.id}
                    style={{
                      marginBottom: "1rem",
                      color: answer.id === option.id ? "red" : "currentColor",
                    }}
                  >
                    {option.value}
                  </li>
                );
              })}
            </ul>
            <h4>
              {" "}
              I hope you can live with the consequences of your choice. Good
              luck!
            </h4>
            <button onClick={resetState}>Ask new question</button>
          </div>
        </React.Fragment>
      );
    } else {
      renderElements = (
        <React.Fragment>
          <div className="forms">
            <h3>Question</h3>
            <input
              placeholder="Q: Enter Any Question"
              onChange={(e) => handleQuestionChange(e.target.value)}
            />

            <h3>Options</h3>
            {possibleAnswers.map((option, idx) => {
              return (
                <div style={{ marginBottom: "1rem" }} key={option.id}>
                  <input
                    placeholder={generateAlpha(idx) + ":"}
                    onChange={(e) => handleOptionChange(option, e.target.value)}
                  />
                </div>
              );
            })}
            <div className="buttons">
              <button onClick={handleAddOption}>
                <strong> + </strong> Option
              </button>
              <button onClick={handleAnswer}>Answer</button>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return renderElements;
  }
}

export default Application;
