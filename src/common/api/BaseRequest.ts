/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestConfigFields } from './RequestConfig';
import dotenv from 'dotenv';
import Allure from '../../utils/Allure';
import _ from 'lodash';
import { env } from 'process';
dotenv.config();

/**
 * Base request module that takes request options and return response or error.
 * This module also attach the REQUEST DATA use in the request to allure report and log the request url.
 *
 * @param requestConfig Request Options
 * @returns {Promise<AxiosResponse<any, any>>} Axios Response Object
 */
export const Request = async (requestConfig: RequestConfigFields): Promise<AxiosResponse<any, any>> => {
  const logRequestConfig = _.omit(requestConfig, 'headers');
  Allure.attachment(`Request Data for ${requestConfig.url}`, JSON.stringify(logRequestConfig, null, 2));

  const request: AxiosRequestConfig<any> = {
    method: requestConfig.method,
    baseURL: env.BASE_URL,
    url: requestConfig.url,
    params: requestConfig.params,
    data: requestConfig.data,
    headers: requestConfig.headers,
    proxy: false
  };

  if (requestConfig.method != 'GET') {
    Object.assign(request, { data: requestConfig.data });
  }

  try {
    const response = await axios(request);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

// Log every request using interceptors.
axios.interceptors.request.use(
  async (req) => {
    Allure.logStep(`${req.method?.toUpperCase()} request => ${req.url}`);
    return req;
  },
  (err) => {
    Allure.logStep(`Error => ${err}`);
    return Promise.reject(err);
  }
);
