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
      resultReady: false,
      memoryList: [],
      memoryMode: false, 
    };
  }

  IsInteger = (num) => {
    return ((num.toString().split('.').length) === 1 && 
    num.toString().match(/^[\-]?\d+$/)) ? (!isNaN(Number.parseInt(num))) : false ;
  };

  handlePressDigit = (digit) => {

    var newScreenText = this.state.screenText;

    newScreenText = (this.state.resultReady || (this.state.memoryMode && this.state.opCount === 0)) ? 
    (newScreenText = "") : (newScreenText);

    newScreenText += digit;

    this.setState({screenText: newScreenText, lastOp: this.state.lastOp,
    opCount: this.state.opCount, resultReady: false, memoryMode: false})  // saveing value in state(updating the state.) 
    
  };
  handlePressOperator = (operator) => {

    var newScreenText = this.state.screenText;
    var opCount = this.state.opCount;

    console.log(newScreenText.length);
    const ch = newScreenText.charAt(newScreenText.length - 1);
    
    if((function (ch){ return !isNaN( parseInt(ch));})(ch)){

      opCount++;
        if(opCount === 2){
          opCount = 1;
          const splitExp = newScreenText.split(this.state.lastOp);  // can split using lastOp.

          // console.log("splitExp[0]: " + splitExp[0]);
          // console.log("splitExp[1]: " + splitExp[1]);

          const oprand1 = (this.IsInteger(splitExp[0])) ? parseInt(splitExp[0]) : parseFloat(splitExp[0]);
          const operation = this.state.lastOp;
          const oprand2 = (this.IsInteger(splitExp[1])) ? parseInt(splitExp[1]) : parseFloat(splitExp[1]);

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
        this.setState({screenText: newScreenText, lastOp: operator, 
          opCount: opCount, resultReady: false});
    }

  };

  handlePressAC = () => {
    this.setState({screenText: "",lastOp:'', opCount: 0, resultReady: false });    // clear the screen for now.
  };

  handlePressDot = () => {
  
    var newScreenText = this.state.screenText;
    console.log(this.state.resultReady);
    console.log(this.state.opCount);
    
    if(this.state.opCount === 0){   // for oprand 1.

      // if(!newScreenText.includes(".")){

        if(newScreenText.length === 0 || this.state.resultReady)
          newScreenText = "0.";

        else{
          
          if(!newScreenText.includes("."))
            newScreenText += ".";
          console.log(newScreenText);
        }
    }

    else{   // for second oprand.
      const splitExp = newScreenText.split(this.state.lastOp);

      if(!splitExp[1].includes(".")){

        if(splitExp[1] === "")
          splitExp[1] = "0.";
        else
          splitExp[1] += ".";
      }
      newScreenText = splitExp[0] + this.state.lastOp + splitExp[1];
    }
    
    this.setState({screenText: newScreenText, lastOp: this.state.lastOp, 
      opCount: this.state.opCount, resultReady: false, memoryMode: false});

  };

  handlePressNegator = () => {

    var newScreenText = this.state.screenText;
    var value;

    if(newScreenText.length !== 0){  // may have problem with this condition.

      const splitExp = newScreenText.split(this.state.lastOp);

      if(this.state.opCount > 0){

        value = (this.IsInteger(splitExp[1])) ? parseInt(splitExp[1]) : parseFloat(splitExp[1]);
      
      }

      else{   // one number is on the screen.

        value = (this.IsInteger(splitExp[0])) ? parseInt(newScreenText) : parseFloat(newScreenText);
        splitExp[0] = "";
      }

      if(!isNaN(value)){

        value = -value;
        newScreenText = splitExp[0] + this.state.lastOp + value.toString();

        this.setState({screenText: newScreenText, lastOp: this.state.lastOp
          , opCount: this.state.opCount})
    }

  }

  };

  handlePressResult = () => {

    var newScreenText = this.state.screenText;
  
    if(this.state.opCount > 0){

      const lastOp = this.state.lastOp;
      const splitExp = newScreenText.split(lastOp);
      const oprand1 = (this.IsInteger(splitExp[0])) ? parseInt(splitExp[0]) : parseFloat(splitExp[0]);
      const oprand2 = (this.IsInteger(splitExp[1])) ? parseInt(splitExp[1]) : parseFloat(splitExp[1]);
      newScreenText = (!this.state.resultReady) ? (newScreenText + "=") : newScreenText;

      switch(lastOp){

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
      console.log(newScreenText);
      
      this.setState({screenText: newScreenText, lastOp: '', 
      opCount:0, resultReady: true, });

    }
  };

  handlePressMC = () => {

    this.setState({memoryList: []});
  };

  handlePressMR = () => {

    if(this.state.memoryList.length > 0){

      var memRead = this.state.memoryList[0].toString();
      var newScreenText = this.state.screenText;

      const splitExp = newScreenText.split(this.state.lastOp);
      newScreenText = (this.state.opCount > 0) ? (splitExp[0] + this.state.lastOp + memRead) 
      : (memRead);

      this.setState({screenText: newScreenText, memoryMode: true});
    }
  };
  
  handlePressMPlus = () => {
    
    // must add if for 2 cases... 
    var screenVal = (this.IsInteger(this.state.screenText)) ? parseInt(this.state.screenText) : parseFloat(this.state.screenText);
    
    if(this.state.memoryList.length > 0){
  
    this.setState(state => {

      const memoryList = state.memoryList.map((number, j) => {

        if (j === 0) {
          return screenVal + number;

        } else {
          return number;
        }
      });
      const memoryMode = true;

      return {memoryList, memoryMode};
    });
  }

  else{
    this.handlePressMS();
  }

  };

  handlePressMMinus = () => {

  };

  handlePressMS = () => {
    
    var screenText = this.state.screenText;
    var value, numVal;

    if(screenText.length !== 0){  // may have problem with this condition.

      if(this.state.opCount > 0){
        const splitExp = screenText.split(this.state.lastOp);
        // check if splitExp[1] is undef -> exp: 12 +   -> ms called from user.
        console.log(splitExp);
        value = (splitExp[1] === "") ? splitExp[0] : splitExp[1];
      }
      
      else{   // one number is on the screen.
        value = screenText;
      }

      numVal = (this.IsInteger(value)) ? parseInt(value) : parseFloat(value);
      // console.log("numval is: " + numVal);

      this.setState(state => {
        const memoryList = [numVal, ...state.memoryList];
        const memoryMode = true;

        return {memoryList, memoryMode};
      });
    }
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
          onPressMC={this.handlePressMC}
          onPressMR={this.handlePressMR}
          onPressMPlus={this.handlePressMPlus}
          onPressMMinus={this.handlePressMMinus}
          onPressMS={this.handlePressMS}
        />
      </div>
    );
  }
}

export default App;
