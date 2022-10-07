import React, { memo, ReactNode, useState } from 'react';
import { Tab } from '../Tab';
import { width } from '../../../utils/screen';
import { Icon } from '../../../components/Icons';
import { areEqual } from '../../../utils/equalityChecks';
import classes from './form.tabs.module.css';

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
}

const createTabs = (activeTab: string, onTabClick: (e: any) => void) => (
  <>
    <Tab
      key="contract-form-tab"
      id="contract-form-tab"
      className={`${classes.flexCenter} ${classes.button} ${
        activeTab === 'contract-form-tab' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="contracts"
      onClick={onTabClick}
    >
      <>
        <Icon type="people" className={classes.icon} />
        <span>Contracts Form</span>
      </>
    </Tab>
  </>
);

const FormTabs = ({ id = 'tabs', className, children }: Props) => {
  const [activeTab, setActiveTab] = useState('contract-form-tab');

  const onTabClick = (e: any) => {
    setActiveTab(e?.currentTarget?.id || activeTab);
  };
  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col">
          <div className={classes.formTabWrapper}>
            <div className={classes.tabsContainer}>
              <ul
                className={`nav nav-tabs ${width < 576 ? 'flex-sm-column' : 'width'}   ${classes.tabs} ${
                  className || ''
                }`}
                id={id}
                role="tablist"
              >
                {createTabs(activeTab, onTabClick)}
              </ul>
            </div>
            <div className="tab-content w-100 h-100 d-inline-block" id="formTabContent" style={{ height: 'auto' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FormTabs.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
};

const FormTabsMemo = memo(FormTabs, areEqual);
export { FormTabsMemo as FormTabs };
