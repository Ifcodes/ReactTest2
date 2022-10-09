import { addingContractForm } from './actions';
export const contractFormSelector = ({ forms: { contractForms: value = [] } }: any) => value;

export const addingContractFormSelector = ({ forms: { addingContractForm: value = false } }: any) => value;

export const deletingContractFormSelector = ({ forms: { deletingContractForm: value = false } }: any) => value;

export const deletedContractFormSelector = ({ forms: { deletedContractForm: value = false } }: any) => value;
