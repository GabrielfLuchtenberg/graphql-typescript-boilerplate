import { ValidationError } from "yup";

export const formatYupError = (error: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = error.inner.map(
    e => ({ path: e.path, message: e.message })
  );

  return errors;
};
