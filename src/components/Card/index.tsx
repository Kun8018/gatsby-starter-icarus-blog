import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import 'dayjs/locale/zh-cn';

import Tag from '../Tag';

import { parseImgur } from '../../api/images';

import './index.scss';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const imageStyle = (headerImage: string, color: string) => ({
  backgroundColor: `#${color}`,
  backgroundImage: ` url(${parseImgur(headerImage, 'large')})`,
  backgroundSize: 'cover',
  borderRadius: '2px',
});

const CardHeader = ({
  url,
  image,
  backgroundColor,
}: {
  url: string;
  image: string;
  backgroundColor: string;
}) => (
  <Link to={url}>
    <div className="wrapper" style={imageStyle(image, backgroundColor)} />
  </Link>
);

const Card = ({
  title,
  date,
  url,
  headerImage,
  thumbnail,
  headerBackgroundColor,
  description,
  tags = [],
}) => {
  dayjs.locale('zh-cn');
  const formatDate = dayjs(date || '').fromNow();

  return (
    <div className="col-sm-12 pb-4">
      <div className="custom-card">
        {thumbnail && (
          <CardHeader
            url={url}
            image={headerImage || thumbnail}
            backgroundColor={headerBackgroundColor}
          />
        )}
        <div className="data">
          <div className="content">
            <div className="stats">
              <span className="date">{formatDate}</span>
              {(tags || []).map(name => (
                <Tag name={name} key={name} />
              ))}
            </div>
            <Link to={url}>
              <h4 className="title">{title}</h4>
            </Link>
            <p>{description}</p>
            <Link to={url} className="read-more">
              阅读更多
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  url: PropTypes.string.isRequired,
  headerImage: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  thumbnail: PropTypes.string,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Card.defaultProps = {
  headerImage: '',
  thumbnail: '',
  tags: [],
  date: '',
  headerBackgroundColor: '',
};

export default Card;
