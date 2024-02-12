import axios from 'axios';
import { throttledGetDataFromApi } from './index'; 


jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((cb) => cb),
  };
});


describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const create = jest.spyOn(axios, 'create').mockReturnValue(axios);
    const data = {data: 'value'};
    jest.spyOn(axios, 'get').mockResolvedValue(data);

    const baseURL =  'https://jsonplaceholder.typicode.com';
  
    await throttledGetDataFromApi('path');
  
    expect(create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create').mockReturnValue(axios);
    const data = {data: 'value'};
    const get = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve(data));

    const relativePath = './';
    await throttledGetDataFromApi(relativePath);

    expect(get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnValue(axios);
    const data = {data: 'value'};
    jest.spyOn(axios, 'get').mockResolvedValue(data);

    const relativePath = './';
    const getDataFromApi = await throttledGetDataFromApi(relativePath);

    expect(getDataFromApi).toBe(data.data);
  });
});
