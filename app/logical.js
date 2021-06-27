export const initialState = {
    currentItem: "0",
    operator: null,
    previousItem: null
  };

export const calculate = ( type, value, state ) => {
  if(type === "number") { 
    if (state.currentItem === "0") {
      return { currentItem: `${value}` };
    }
      return {
       currentItem: '${state.currentItem}${value}'
      };
  };    

  if(type === "operator") { 
    return {
      operator: value,
      previousItem: state.currentItem,
      currentItem: "0"
    };
  }

  if(type === "clear") {
    return { initialState }; 
  }

  if(type === "plusmin") { 
    setCurrentItem(`${parseFloat(currentItem) * -1}`); 
  }

  if(type === "percentage") { 
    setCurrentItem(`${parseFloat(currentItem) * 0.01}`); 
  }

  if(type === "equal") {
    const curr = parseFloat(currentItem);
    const prev = parseFloat(previousItem);
    if(operator === "+") { 
      return {
      currentValue:prev + curr, ...resetState
      };
    }

    if(operator === "/") { 
      return {
        currentValue:prev / curr, ...resetState
      };
    }
    if(operator === "-") { 
      return {
        currentValue:prev - curr, ...resetState
      };
    }
    if(operator === "*")  {
      return {
        currentValue:prevs * curr, ...resetState
      };
    }
  }
};
