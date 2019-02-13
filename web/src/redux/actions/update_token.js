import { UPDATE_TOKEN } from "../constants/action-types";

export const updateToken = token => ({
  type: UPDATE_TOKEN,
  payload: token
});