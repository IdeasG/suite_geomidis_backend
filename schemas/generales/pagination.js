import { z } from 'zod';

const querySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
});

const positiveNumberSchema = z.string().refine((value) => {
  const number = parseInt(value, 10);
  return !isNaN(number) && number > 0;
}, {
  message: 'Debe ser un número positivo.',
});

const extendedQuerySchema = querySchema.transform((data) => ({
  ...data,
  page: data.page !== undefined ? positiveNumberSchema.safeParse(data.page).data : undefined,
  pageSize: data.pageSize !== undefined ? positiveNumberSchema.safeParse(data.pageSize).data : undefined,
}));

export function validatePagination(input) {
  return extendedQuerySchema.safeParse(input);
}

