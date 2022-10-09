/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_CONTRACT_FORMS = 'SET_CONTRACT_FORMS';
export const FETCHING_CONTRACT_FORMS = 'FETCHING_CONTRACT_FORMS';
export const ADDING_CONTRACT_FORM = 'ADDING_CONTRACT_FORM';
export const DELETING_CONTRACT_FORM = 'DELETING_CONTRACT_FORM';
export const DELETED_CONTRACT_FORM = 'DELETED_CONTRACT_FORM';

interface ActionTypes {
  SET_CONTRACT_FORMS: object;
  FETCHING_CONTRACT_FORMS: boolean;
  ADDING_CONTRACT_FORM: boolean;
  DELETING_CONTRACT_FORM: boolean;
  DELETED_CONTRACT_FORM: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type formsActionTypes = MessageAction;

export const listContractForms =
  (companyId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // enable the spinner
    setFetchingContractForms(true);
    const response = await handleApiRequest(dispatch, utils.Api.get(`/companies/${companyId}/contract-forms`));

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_CONTRACT_FORMS,
        payload: data,
      });
    } else {
      // disable the spinner if something goes wrong with the API
      setFetchingContractForms(false);
    }
  };

export const postContractForm =
  (form: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // enable the spinner
    dispatch(addingContractForm(true));
    const response = await handleApiRequest(dispatch, utils.Api.post(`/contract-forms`, { ...form }));

    if (response?.data) {
      dispatch(addingContractForm(false));
    } else {
      // disable the spinner if something goes wrong with the API
      dispatch(addingContractForm(false));
    }
  };

export const deleteContractForm =
  (formId: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // enable the spinner

    dispatch(deletingContractForm(true));
    const response = await handleApiRequest(dispatch, utils.Api.delete(`/contract-forms/${formId}`));

    if (response?.data) {
      const { data } = response;

      dispatch(deletedContractForm(true));
    } else {
      // disable the spinner if something goes wrong with the API
      dispatch(deletedContractForm(false));
      dispatch(deletingContractForm(false));
    }
  };

/*
 * NON-API THUNKS
 * */
export const setFetchingContractForms = (value: boolean) => (dispatch) => {
  dispatch({
    type: FETCHING_CONTRACT_FORMS,
    payload: value,
  });
};

export const addingContractForm = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: ADDING_CONTRACT_FORM,
    payload: value,
  });
};

export const deletingContractForm = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: DELETING_CONTRACT_FORM,
    payload: value,
  });
};

export const deletedContractForm = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: DELETED_CONTRACT_FORM,
    payload: value,
  });
};
