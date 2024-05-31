export interface HttpInterfaceAdapter {
  get<T>(url: string, headers?: object, params?: object): Promise<T>;
}
