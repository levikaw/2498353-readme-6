import { isNotEmpty } from 'class-validator';

export const calculateSkip = (page?: number, limit?: number) => (isNotEmpty(page) && isNotEmpty(limit) ? (page - 1) * limit : 0);
