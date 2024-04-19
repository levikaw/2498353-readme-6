export class SuccessResponse<T> {
  private readonly succes: boolean = true;
  private readonly data?: T;
  private readonly total?: number;

  constructor(response?: [T, number]) {
    [this.data, this.total] = response;
  }
}
