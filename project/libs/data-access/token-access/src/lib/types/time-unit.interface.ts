export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';

export interface TimeAndUnitInterface {
  value: number;
  unit: DateTimeUnit;
}
