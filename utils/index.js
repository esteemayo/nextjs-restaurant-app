const excerpts = (str, count) => {
  if (str.length > count) {
    str = str.slice(0, count) + '...';
  }
  return str;
};

export default excerpts;
