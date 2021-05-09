import React from "react";

import Keypad from "./components/Keypad";
import Screen from "./components/Screen";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenText: "",
      lastOp: '',
      opCount: 0,
    };
  }
  handlePressDigit = (digit) => {

    var newScreenText = this.state.screenText;
    newScreenText += digit;
    console.log(newScreenText)
    this.setState({screenText: newScreenText})  // saveing value in state(updating the state.) 
    
  };
  handlePressOperator = (operator) => {

    var newScreenText = this.state.screenText;
    var opCount = this.state.opCount;
    const ch = newScreenText.charAt(newScreenText.length - 1)
    

    if((function (ch){ return !isNaN( parseInt(ch));})(ch)){

      opCount++;
        if(opCount === 2){
          opCount = 1;
          const splitExp = newScreenText.split(/[+*/-]/g);  // can split using lastOp.

          var IsInteger = function(num){
            return ((num.toString().split('.').length) === 1 && 
            num.toString().match(/^[\-]?\d+$/)) ? (!isNaN(Number.parseInt(num))) : false ;
        }

          console.log("splitExp[0]: " + splitExp[0]);
          console.log("splitExp[1]: " + splitExp[1]);

          const oprand1 = (IsInteger(splitExp[0])) ? parseInt(splitExp[0]) : parseFloat(splitExp[0]);
          const operation = this.state.lastOp;
          const oprand2 = (IsInteger(splitExp[1])) ? parseInt(splitExp[1]) : parseFloat(splitExp[1]);

          console.log("op: " + operation);
          console.log("oprand1: " + oprand1);
          console.log("oprand2: " + oprand2);
      
          switch(operation){

              case '+':
                newScreenText = (oprand1 + oprand2).toString()
                break;

              case '-':
                newScreenText = (oprand1 - oprand2).toString()
                break;

              case '/':
                newScreenText = (oprand1 / oprand2).toString()
                break;

              case '*':
                newScreenText = (oprand1 * oprand2).toString()
                break;

              default:
                console.log("default!");

          }
        }

        newScreenText += operator;
        console.log(newScreenText);
        this.setState({screenText: newScreenText, lastOp: operator, opCount: opCount,});
    }

  };

  handlePressAC = () => {
    this.setState({screenText: ""});    // clear the screen for now.
  };

  handlePressDot = () => {
  
    var newScreenText = this.state.screenText;
    if(!newScreenText.includes('.')){

      if(newScreenText.length === 0)
        newScreenText = "0.";

      else{

        newScreenText += ".";
        console.log(newScreenText);
      }

      this.setState({screenText: newScreenText, lastOp: this.state.lastOp,
         opCount: this.state.opCount});
    }
  };

  handlePressNegator = () => {
    //var newScreenText = this.state.screenText;
  };
  handlePressResult = () => {

    var newScreenText = this.state.screenText;
    newScreenText += "=";
    console.log(newScreenText);
    this.setState({screenText: newScreenText});

  };
  
  render() {
    return (
      <div>
        <Screen text={this.state.screenText} />
        <Keypad
          onPressDigit={this.handlePressDigit}
          onPressOperator={this.handlePressOperator}
          onPressAC={this.handlePressAC}
          onPressDot={this.handlePressDot}
          onPressNegator={this.handlePressNegator}
          onPressResult={this.handlePressResult}
        />
      </div>
    );
  }
}

export default App;
