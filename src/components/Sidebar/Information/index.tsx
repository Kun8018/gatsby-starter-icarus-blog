import React from 'react';

import PropTypes from 'prop-types';

import './index.scss';

type InformationProps = { totalCount: number };

// eslint-disable-next-line react/prop-types
const Information: React.FC<InformationProps> = ({ totalCount }) => (
  <div className="d-none d-lg-block information my-2">
    <hr />
    <p>
      共&nbsp;
      {totalCount}
      &nbsp;篇文章
    </p>
  </div>
);

Information.propTypes = {
  totalCount: PropTypes.number.isRequired,
};

export default Information;
