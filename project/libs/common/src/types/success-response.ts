export class SuccessResponse<T> {
  private readonly succes: boolean = true;
  private readonly data?: T;
  private readonly total?: number;

  constructor(response?: [T, number] | T) {
    if (Array.isArray(response)) {
      [this.data, this.total] = response;
    } else {
      this.data = response;
    }
  }
}
