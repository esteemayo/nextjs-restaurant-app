import cookie from 'cookie';

export const parseCookie = (req) =>
  cookie.parse(req ? req.headers.cookie || '' : '');

export const excerpts = (str, count) => {
  if (str.length > count) {
    str = str.slice(0, count) + '...';
  }
  return str;
};
