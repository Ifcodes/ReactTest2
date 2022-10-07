import React, { memo, useEffect, useState } from 'react';
import { areEqual } from '../../../utils/equalityChecks';
import { Modal } from '../../../../shared/components/Modal';
import classes from './addFormModal.module.css';
import { Icon } from 'Components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { addingContractFormSelector } from '../selector';
import { postContractForm } from '../actions';

const templateList = [
  '~~~name~~~',
  '~~~project~~~',
  '~~~job_no~~~',
  '~~~company~~~',
  '~~~current_date~~~',
  '~~~date_of_loss~~~',
  '~~~company_address~~~',
  '~~~policy_holder_name~~~',
  '~~~policy_number~~~',
  '~~~claim_number~~~',
  '~~~input~~~',
  '~~~checkbox~~~',
];
const AddFormModal = ({ isOpen, setShowModal }: { isOpen: boolean; setShowModal: Function; openModal?: Function }) => {
  const dispatch = useDispatch();
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const isAddingContract = useSelector(addingContractFormSelector, areEqual);
  const [formData, setFormData] = useState({
    formName: '',
    requireSignature: false,
    contractTemplate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      company_id: firstCompanyId,
      name: formData.formName,
      replacement_tags: '',
      status: 'active',
      template: formData.contractTemplate,
      has_signature: formData.requireSignature,
    };

    dispatch(postContractForm(data));
  };
  {
    console.log({ isAddingContract });
  }
  useEffect(() => {
    if (isAddingContract === false) {
      setFormData({ formName: '', requireSignature: false, contractTemplate: '' });
      setShowModal(false);
    }
  }, [isAddingContract]);

  return (
    <div className={isOpen ? classes.modal : classes.closedModal}>
      <div className={isOpen ? classes.modalWrapper : classes.hideModal}>
        <div className={classes.nav}>
          <div className={classes.titleCont}>
            <Icon type="folder" />
            <h1>Contract form</h1>
          </div>
          <Icon type="close" onClick={() => setShowModal(false)} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputContainer}>
            <label htmlFor="name">Form Name</label>
            <input
              id="name"
              value={formData.formName}
              onChange={(e) => setFormData({ ...formData, formName: e.target.value })}
            />
          </div>
          <div className={classes.checkBoxCont}>
            <label htmlFor="signature">Require signature</label>
            <input
              type="checkbox"
              id="signature"
              checked={formData.requireSignature}
              onChange={() => setFormData({ ...formData, requireSignature: !formData.requireSignature })}
            />
          </div>
          <h3>Contract Template</h3>
          <div className={classes.templateInputWrapper}>
            <div className={classes.tempListWrapper}>
              {templateList.map((temp) => (
                <span key={temp}>{temp}</span>
              ))}
            </div>
            <textarea
              value={formData.contractTemplate}
              onChange={(e) => setFormData({ ...formData, contractTemplate: e.target.value })}
            />
          </div>
          <div className={classes.btnWrapper}>
            <button type="submit" className={classes.btnPrimary}>
              {isAddingContract ? 'Adding...' : 'Add Contract'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddFormMemo = memo(AddFormModal, areEqual);

export { AddFormMemo as AddFormModal };
