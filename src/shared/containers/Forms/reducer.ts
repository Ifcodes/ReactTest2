import { FETCHING_CONTRACT_FORMS, formsActionTypes, SET_CONTRACT_FORMS, ADDING_CONTRACT_FORM } from './actions';

const initialState = {
  fetchingContractForms: false,
  addingContractForm: false,
  contractForms: [],
};

export const formsReducer = (state = initialState, action: formsActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CONTRACT_FORMS:
      return {
        state,
        contractForms: payload,
      };
    case FETCHING_CONTRACT_FORMS:
      return {
        ...state,
        fetchingContractForms: payload,
      };
    case ADDING_CONTRACT_FORM:
      return {
        ...state,
        addingContractForm: payload,
      };
    default:
      return state;
  }
};
