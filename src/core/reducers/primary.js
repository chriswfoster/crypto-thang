const initialState = {
    something: 'nothing'
  }

  
    export default function reducer(state = initialState, action) {
  
      let state2 = state;
      switch (action.type) {
        case "SET_STORES":
          return { ...state2, ...action.payload };
        default:
          break;
      }
      return state2;
  }



