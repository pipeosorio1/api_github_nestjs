import { HttpInterfaceAdapter } from '@common/interfaces/http-adapter.interface';
import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosAdapter implements HttpInterfaceAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string, headers?: object, params?: object): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, { headers, params });
      return data;
    } catch (error) {
      if (error.response?.data.status === 400) {
        throw new BadRequestException(error.response.data);
      }
      throw new ConflictException(error.message);
    }
  }
}
