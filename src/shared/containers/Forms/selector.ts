import { addingContractForm } from './actions';
export const contractFormSelector = ({ forms: { contractForms: value = [] } }: any) => value;

export const addingContractFormSelector = ({ forms: { addingContractForm: value = false } }: any) => value;
