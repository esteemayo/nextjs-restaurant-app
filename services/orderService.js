import http from './httpService';

const apiEndpoint = '/orders';

const orderUrl = (orderId) => `${apiEndpoint}/${orderId}`;

export const getOrders = () => http.get(apiEndpoint);

export const getOrder = (orderId) => http.get(orderUrl(orderId));

export const createNewOrder = (order) => http.post(apiEndpoint, order);
