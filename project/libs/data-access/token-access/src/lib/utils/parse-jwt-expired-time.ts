import { DateTimeUnit, TimeAndUnitInterface } from '../types/time-unit.interface';

export function parseJwtExpiredTime(time: string): TimeAndUnitInterface {
  const match = new RegExp(/^(\d+)([shdmy])/).exec(time);

  if (!match) {
    throw new Error(`[parseJwtExpiredTime] Bad time string: ${time}`);
  }

  const [_, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseJwtExpiredTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
}
