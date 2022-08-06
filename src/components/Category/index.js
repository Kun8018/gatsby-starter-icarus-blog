import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Category = ({ categories, prefix }) => {
  const arr = Object.keys(categories);

  return (
    <div className="col-xl-12 col-lg-7 col-md-12 col-xs-12 order-2 content">
      {(arr || []).map(category => (
        <a href={`/${prefix}/${category}`} className="header-tag">
          {category}
          &nbsp;
          {categories[category]}
        </a>
      ))}
    </div>
  );
};

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.node),
  prefix: PropTypes.string,
};

Category.defaultProps = {
  categories: [],
  prefix: 'category',
};

export default Category;
