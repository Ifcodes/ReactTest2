import React, { memo } from 'react';
import { areEqual } from '../../../utils/equalityChecks';
import { FormTabs } from '../../../components/Tabs/FormTabs';
import { FormTemplate } from '../FormTemplate';

const FormTabsContainer = () => {
  const getData = () => {};
  return (
    <FormTabs id="form-tabs">
      <FormTemplate />
    </FormTabs>
  );
};

FormTabsContainer.defaultProps = {};

const FormsContainerMemo = memo(FormTabsContainer, areEqual);

export { FormsContainerMemo as FormsContainer };
