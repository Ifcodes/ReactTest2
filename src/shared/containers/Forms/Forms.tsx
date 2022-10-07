import React, { memo } from 'react';
import { FormsContainer } from './FormsTab';
import { areEqual } from '../../utils/equalityChecks';

const Forms = () => {
  return <FormsContainer />;
};

const FormMemo = memo(Forms, areEqual);

export { FormMemo as Forms };
