import { navigate } from 'gatsby';
import dayjs from 'dayjs';

export const getUrl = ({ createdDate, url }: { createdDate: string; url: string }) =>
  `/${dayjs(createdDate).format('YYYY/MM/DD')}/${url}`;

export const gotoPage = async (url: string, show = false) => {
  if (show === true) {
    await window?.$('.collapse').collapse('show');
  } else {
    await window?.$('.collapse').collapse('hide');
  }

  await navigate(url);
};

export const parseMarkdownUrl = (date: string, rawUrl: string) =>
  `/${date}/${rawUrl.match(/_posts[/](.*).md/)?.[1]}/`;

export const parseUrl = (date: string, rawUrl: string) => {
  if (rawUrl === 'about') {
    return '/about/';
  }
  return `/${date}/${rawUrl}/`;
};

export const minusOnePage = (currentPage: number) => {
  if (currentPage - 1 >= 1) {
    return currentPage - 1;
  }

  return -1;
};

export const addOnePage = (currentPage = 0, maxPages = 1) => {
  if (currentPage + 1 < maxPages) {
    return currentPage + 1;
  }
  return -1;
};

export const parsePageUrl = (index: number) => {
  if (index > 0) {
    return `/page/${index}`;
  }
  if (index === 0) {
    return '/';
  }
  return '/';
};

export const handlePreviousPage = (pageNumber: number) => {
  const index = minusOnePage(+pageNumber);

  return parsePageUrl(index);
};

export const handleNextPage = (pageNumber: number, maxPages: number) => {
  const index = addOnePage(+pageNumber, maxPages);

  return parsePageUrl(index);
};
