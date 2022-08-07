import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import classNames from 'classnames';
import './index.scss';

const Archive = ({ categories, prefix, isPage }) => {
  const arr = Object.keys(categories).sort(function(o1, o2) {
    return o2 - o1;
  });
  dayjs.locale('zh-cn');

  return (
    <div
      className={classNames({
        'col-xl-12 col-lg-7 col-md-12 col-xs-12 order-2 content': !isPage,
        'col-xl-6 col-lg-7 col-md-12 col-xs-12 order-2 content margin': isPage,
      })}
    >
      {(arr || []).map(category => {
        const date = dayjs.unix(category).format('MMM-YYYY');
        return (
          <a href={`/${prefix}/${date}`} className="category">
            {date}
            &nbsp;
            <span className="number">{categories[category]}</span>
          </a>
        );
      })}
    </div>
  );
};

Archive.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.node),
  prefix: PropTypes.string,
  isPage: PropTypes.boolean,
};

Archive.defaultProps = {
  categories: [],
  prefix: 'category',
  isPage: true,
};

export default Archive;
