import { Icon } from 'Components/Icons';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from '../../../utils/equalityChecks';
import { listContractForms } from '../actions';
import { addingContractFormSelector, contractFormSelector } from '../selector';
import classes from './formTemplateStyles.module.css';
import { AddFormModal } from '../AddFormModal';

const FormListItem = memo(({ name, created_at }: { name?: string; created_at?: string }) => (
  <div className={classes.listItemWrapper}>
    <div>
      <span>{name}</span>
    </div>
    <div>
      <span>{created_at}</span>
    </div>
    <div>
      <Icon type="trash" />
    </div>
  </div>
));
const FormTemplate = () => {
  const dispatch = useDispatch();
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const contractForms = useSelector(contractFormSelector);
  const [showModal, setShowModal] = useState(false);
  const isAddingContract = useSelector(addingContractFormSelector, areEqual);

  const getForms = () => {
    dispatch(listContractForms(firstCompanyId));
  };

  useEffect(() => {
    getForms();
  }, [isAddingContract]);

  console.log({ contractForms });

  // listContractForms();
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
            <FormListItem key={data.id} {...data} />
          ))}
        </div>
      </div>
      <AddFormModal isOpen={showModal} setShowModal={setShowModal} />
    </div>
  );
};

const FormTemplateMemo = memo(FormTemplate, areEqual);

export { FormTemplateMemo as FormTemplate };
