import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const imageFileValidator: ValidatorFn = (
  control: AbstractControl<File | null>,
): ValidationErrors | null => {
  const file = control.value;

  if (!file) {
    return null;
  }

  return file.type.startsWith('image/') ? null : { invalidImageType: true };
};

export const maxFileSizeValidator = (maxSize: number): ValidatorFn => {
  return (control: AbstractControl<File | null>): ValidationErrors | null => {
    const file = control.value;

    if (!file || file.size <= maxSize) {
      return null;
    }

    return {
      maxFileSize: {
        maxSize,
        actualSize: file.size,
      },
    };
  };
};
