import axios from 'axios';
import {BASE_URL} from 'config/constants/api_constants';
const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

type MethodType = typeof GET | typeof POST | typeof PUT | typeof DELETE;

class ApiHelper {
  private readonly axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    timeout: 30000,
    responseType: 'json',
  });

  get = (url: string, data: object | undefined) => {
    return this.request(GET, url, data);
  };
  post = (url: string, data: object) => {
    return this.request(POST, url, data);
  };
  put = (url: string, data: object) => {
    return this.request(PUT, url, data);
  };
  delete = (url: string, data: object) => {
    return this.request(DELETE, url, data);
  };

  private request = async (
    method: MethodType,
    url: string,
    data: object | undefined,
  ) => {
    try {
      return this.axiosInstance.request({
        method,
        url,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new ApiHelper();
