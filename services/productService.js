import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productId) => `${apiEndpoint}/${productId}`;

export const getProducts = () => http.get(apiEndpoint);

export const getProduct = (productId) => http.get(productUrl(productId));

export const createProduct = (product) => http.post(apiEndpoint, product);

export const updateProduct = (productId, product) =>
  http.patch(productUrl(productId), product);

export const deleteProduct = (productId) => http.delete(productUrl(productId));
