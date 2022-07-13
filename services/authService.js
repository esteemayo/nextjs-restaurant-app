import http from './httpService';

const apiEndpoint = '/login';

export const loginUser = (credentials) => http.post(apiEndpoint, credentials);
