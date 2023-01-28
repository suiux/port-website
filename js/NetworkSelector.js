import React, { useEffect, useState, useMemo } from 'react';
import cx from 'classnames';
import Select, { components } from 'react-select';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import TabItemRenderer from './TabItemRenderer';
import PolygonIcon from '../../assets/images/polygon-pure.svg';
import './NetworkSelector.scss';
import {
  getChainType,
  providersN,
} from '../../utils/BlockchainServiceProviders';

const polygonProviders = providersN
  .filter((provider) => provider.type === 'Polygon')
  .map((provider) => ({
    value: provider.value,
    label: provider.label,
  }));

const Option = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="react-select__imageBlock">
        <img src={PolygonIcon} alt="polygon" />
      </div>
      <div className="react-select__optionText">{children}</div>
    </components.Option>
  );
};
const style1 = {
  control: (base, state) => ({
    ...base,
    border: '0 !important',
    boxShadow: '0 !important',
    '&:hover': {
      border: '0 !important',
    },
  }),
};
const Control = ({ children, ...props }) => {
  return (
    <components.Control {...props}>
      <div className="react-select__imageBlock">
        <img src={PolygonIcon} alt="polygon" />
      </div>
      {children}
    </components.Control>
  );
};

const NetworkSelector = ({ chain, handleChange, paddingBottom = true }) => {
  const initialItem = useMemo(
    () =>
      providersN
        .map((provider) => ({
          value: provider.value,
          label: provider.label,
        }))
        .find((provider) => provider.value === chain),
    [chain]
  );
  const [activeSelectItem, setActiveSelectItem] = useState(initialItem);

  const handleSelectItem = (event) => {
    setActiveSelectItem(event);
  };

  useEffect(() => {
    handleChange(activeSelectItem);
  }, [activeSelectItem]);

  return (
    <div
      className={classNames('networkSelector', {
        noPaddingBottom: paddingBottom == false,
      })}
    >
      <div className="react-select">
        <Select
          options={polygonProviders}
          isClearable={false}
          isSearchable={false}
          defaultValue={activeSelectItem}
          styles={style1}
          onChange={handleSelectItem}
          classNamePrefix="react-select"
          components={{
            Option,
            Control,
          }}
        />
      </div>
    </div>
  );
};

export default NetworkSelector;
