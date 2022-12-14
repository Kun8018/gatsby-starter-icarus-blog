import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from 'classnames';
import './index.scss';

const Category = ({ categories, prefix, isPage }) => {
  const arr = Object.keys(categories);

  return (
    <div
      className={classNames({
        'col-xl-12 col-lg-7 col-md-12 col-xs-12 order-2 content': !isPage,
        'col-xl-6 col-lg-7 col-md-12 col-xs-12 order-2 content margin': isPage,
      })}
    >
      {(arr || []).map(category => {
        if (category === 'null') return;
        return (
          <a href={`/${prefix}/${category}`} className="category">
            {category}
            &nbsp;
            <span className="number">{categories[category]}</span>
          </a>
        );
      })}
    </div>
  );
};

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.node),
  prefix: PropTypes.string,
  isPage: PropTypes.boolean,
};

Category.defaultProps = {
  categories: [],
  prefix: 'category',
  isPage: true,
};

export default Category;
