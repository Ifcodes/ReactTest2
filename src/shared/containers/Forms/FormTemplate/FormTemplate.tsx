import { Icon } from 'Components/Icons';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from '../../../utils/equalityChecks';
import { deleteContractForm, listContractForms } from '../actions';
import {
  addingContractFormSelector,
  contractFormSelector,
  deletedContractFormSelector,
  deletingContractFormSelector,
} from '../selector';
import classes from './formTemplateStyles.module.css';
import { AddFormModal } from '../AddFormModal';
import { Spinner } from 'Components/Spinner';

const FormListItem = memo(
  ({
    name,
    created_at,
    id,
    handleDelete = () => {},
  }: {
    name?: string;
    created_at?: string;
    id?: any;
    handleDelete?: Function;
  }) => {
    const isDeleting = useSelector(deletingContractFormSelector, areEqual);

    return (
      <div className={classes.listItemWrapper}>
        <div>
          <span>{name}</span>
        </div>
        <div>
          <span>{created_at}</span>
        </div>
        <div>
          <Icon type="trash" onClick={() => handleDelete(id)} />
        </div>
        <Spinner loading={isDeleting} />
      </div>
    );
  }
);

const FormTemplate = () => {
  const dispatch = useDispatch();
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const contractForms = useSelector(contractFormSelector);
  const [showModal, setShowModal] = useState(false);
  const isAddingContract = useSelector(addingContractFormSelector, areEqual);
  const isDeleted = useSelector(deletedContractFormSelector, areEqual);
  const isDeleting = useSelector(deletingContractFormSelector, areEqual);

  const getForms = () => {
    dispatch(listContractForms(firstCompanyId));
  };

  useEffect(() => {
    getForms();
  }, [isAddingContract]);

  const deleteForm = useCallback((formId: any) => {
    dispatch(deleteContractForm(formId));
  }, []);

  useEffect(() => {
    if (!isDeleting) {
      getForms();
    }
  }, [isDeleted, isDeleting]);

  return (
    <div className={classes.templateWrapper}>
      <div className={classes.titleWrapper}>
        <h1>Form Templates</h1>
        <button onClick={() => setShowModal(true)}>
          <span>Add</span>
          <Icon type="plus" />
        </button>
      </div>
      <div className={classes.tableWrapper}>
        <div className={classes.tableHead}>
          <div>
            <span>TEMPLATE NAME</span>
          </div>
          <div>
            <span>DATE CREATED</span>
          </div>
        </div>
        <div>
          {contractForms.map((data) => (
            <FormListItem key={data.id} {...data} id={data.id} handleDelete={() => deleteForm(data.id)} />
          ))}
        </div>
      </div>
      <AddFormModal isOpen={showModal} setShowModal={setShowModal} />
    </div>
  );
};

const FormTemplateMemo = memo(FormTemplate, areEqual);

export { FormTemplateMemo as FormTemplate };
