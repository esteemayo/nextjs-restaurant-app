import http from './httpService';

const apiEndpoint = '/orders';

const orderUrl = (orderId) => `${apiEndpoint}/${orderId}`;

export const getOrders = () => http.get(apiEndpoint);

export const getOrder = (orderId) => http.get(orderUrl(orderId));

export const createNewOrder = (order) => http.post(apiEndpoint, order);

export const updateOrder = (orderId, order) =>
  http.patch(orderUrl(orderId), order);

export const deleteOrder = (orderId) => http.delete(orderUrl(orderId));
