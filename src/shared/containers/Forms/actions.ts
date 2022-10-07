/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_CONTRACT_FORMS = 'SET_CONTRACT_FORMS';
export const FETCHING_CONTRACT_FORMS = 'FETCHING_CONTRACT_FORMS';
export const ADDING_CONTRACT_FORM = 'ADDING_CONTRACT_FORM';

interface ActionTypes {
  SET_CONTRACT_FORMS: object;
  FETCHING_CONTRACT_FORMS: boolean;
  ADDING_CONTRACT_FORM: boolean;
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
      const { data } = response;
      console.log(data);

      // dispatch({
      //   type: SET_CONTRACT_FORMS,
      //   payload: data,
      // });
    } else {
      // disable the spinner if something goes wrong with the API
      dispatch(addingContractForm(false));
    }
  };

export const deleteContractForm =
  (formId: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // enable the spinner
    const response = await handleApiRequest(dispatch, utils.Api.post(`/contract-forms/${formId}`));

    if (response?.data) {
      const { data } = response;
      console.log(data);

      // dispatch({
      //   type: SET_CONTRACT_FORMS,
      //   payload: data,
      // });
    } else {
      // disable the spinner if something goes wrong with the API
      dispatch(addingContractForm(false));
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
