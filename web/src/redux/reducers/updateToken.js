import { UPDATE_TOKEN } from "../constants/action-types";

const initialState = {
  articles: ''
};

const updateToken = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default updateToken;