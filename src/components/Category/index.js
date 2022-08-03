import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Category = ({ categories }) => {
  const arr = Object.keys(categories);

  return (
    <div className="col-xl-6 col-lg-7 col-md-12 col-xs-12 order-2 content">
      {(arr || []).map(category => (
        <a href={`/category/${category}`} className="header-tag">
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
};

Category.defaultProps = {
  categories: [],
};

export default Category;
