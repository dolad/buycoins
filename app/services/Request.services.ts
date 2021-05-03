
import axios, { AxiosRequestConfig, Method } from 'axios';

export class Request {
    protected token: string;
    protected baseURL: string
    // eslint-disable-next-line @typescript-eslint/ban-types
    public async fetchRequest(url: string, method: Method, data?: object) {
        const options: AxiosRequestConfig = {
            url: `${this.baseURL}${url}`,
            data,
            method,
            headers: {
                Authorization: this.token,
            },
        };

        const request = await axios(options);
        return request.data;
    }
}
