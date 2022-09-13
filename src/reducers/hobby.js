const initialState = {
  list: [],
  activeId: null,
};

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY":
      const newHobbyList = [...state.list];
      newHobbyList.push(action.payload);
      return {
        ...state,
        list: newHobbyList,
      };
    case "SET_ACTIVE_HOBBY":
      const activeId = action.payload.id;
      return {
        ...state,
        activeId: activeId,
      };
    default:
      return state;
  }
};

export default hobbyReducer;
