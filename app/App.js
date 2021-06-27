import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';

import Row from './Row';
import Button from './Button';
  
  const initialState = {
    currentItem: "0",
    operator: null,
    previousItem: null
  };
  const countNumbers = (value, state) => {
    if (state.currentItem === "0") {
      return ({ currentItem: `${value}` });
    }
    else {
      return ({ currentItem : `${state.currentItem}${value}` });
    }
    
  };

  const countEqual = state => {
    const { currentItem, previousItem, operator } = state;
    const currIt = parseFloat(currentItem);
    const prevIt = parseFloat(previousItem);
    const dropState = {
      operator: null,
      previousItem: null
    };

    if(operator === "+") { 
      return {
      currentItem:prevIt + currIt, ...dropState
      };
    }

    if(operator === "/") { 
      return {
        currentItem:prevIt / currIt, ...dropState
      };
    }
    if(operator === "-") { 
      return {
        currentItem:prevIt - currIt, ...dropState
      };
    }
    if(operator === "*")  {
      return {
        currentItem:prevIt * currIt, ...dropState
      };
    }
  }
  const calculate = ( type, value, state ) => {
    if (type === "number") {
      return countNumbers(value, state);
    }
    if (type === "operator") {
      return ({
        operator: value,
        previousItem: state.currentItem,
        currentItem: "0"
      });
    }
    if(type === "plusmin") { 
      return ({
        currentItem: `${parseFloat(state.currentItem) * -1}`
      });
    }
    if(type === "percentage") { 
      return ({
        currentItem: `${parseFloat(state.currentItem) * 0.01}`
      });
    }
    if (type === "equal") {
      return countEqual(state);
    }
    if(type === "clear") {
      return initialState; 
    }
    return state;
  }
 
export default class App extends React.Component {
  state = initialState;
    onHandleTap = (type, value) => {
    this.setState(state => calculate(type, value, state));
  };

  render() {
   return (
     <View style={styles.container}>
     <StatusBar barStyle="light-content" />
     <SafeAreaView>
       <Text style={styles.value}>
       {parseFloat(this.state.currentItem).toLocaleString()}
       </Text>
       <Row>
           <Button 
           text="C" theme="secondary" onPress={() => this.onHandleTap("clear")} 
           />
           <Button
           text="+/-" theme="secondary" onPress={() => this.onHandleTap("plusmin")} 
            />
           <Button 
           text="%" theme="secondary" onPress={() => this.onHandleTap("percentage")} 
           />
           <Button 
           text="/" theme="accent" onPress={() => this.onHandleTap("operator","/")} 
           />
       </Row>
       <Row>
           <Button 
           text="7" onPress={() => this.onHandleTap("number",7)} 
           />
           <Button 
           text="8" onPress={() => this.onHandleTap("number",8)} 
           />
           <Button 
           text="9" onPress={() => this.onHandleTap("number",9)} 
           />
           <Button 
           text="x" theme="accent" onPress={() => this.onHandleTap("operator","*")} 
           />
       </Row>
       <Row>
           <Button 
           text="4" onPress={() => this.onHandleTap("number",4)} />
           <Button 
           text="5" onPress={() => this.onHandleTap("number",5)} />
           <Button 
           text="6" onPress={() => this.onHandleTap("number",6)} />
           <Button 
           text="-" theme="accent" onPress={() => this.onHandleTap("operator","-")} />
       </Row>
       <Row>
           <Button 
           text="1" onPress={() => this.onHandleTap("number",1)} 
           />
           <Button 
           text="2" onPress={() => this.onHandleTap("number",2)} 
           />
           <Button 
           text="3" onPress={() => this.onHandleTap("number",3)} 
           />
           <Button 
           text="+" theme="accent" onPress={() => this.onHandleTap("operator","+")} 
           />
       </Row>
       <Row>
           <Button 
           text="0" size="double" onPress={() => this.onHandleTap("number",0)} 
           />
           <Button 
           text="." onPress={() => this.onHandleTap("number",".")}
           />
           <Button 
           text="=" theme="accent" onPress={() => this.onHandleTap("equal")} 
           />
        </Row>
      </SafeAreaView>
    </View>
   );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: "flex-end",
  },
  value: {
      color: "#fff",
      fontSize: 40,
      textAlign: "right",
      marginRight: 20,
      marginBottom: 10
  }
});
