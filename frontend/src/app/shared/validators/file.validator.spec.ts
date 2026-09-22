import { FormControl } from '@angular/forms';
import { imageFileValidator, maxFileSizeValidator } from '@shared/validators/file.validator';
import { expect } from 'vitest';

describe('imageFileValidator', () => {
  it('should accept an image', () => {
    const file = new File(['image'], 'avatar.png', {
      type: 'image/png',
    });

    const control = new FormControl(file);
    const result = imageFileValidator(control);

    expect(result).toBeNull();
  });

  it('should reject a PDF file', () => {
    const file = new File(['image'], 'mock_test.pdf', {
      type: 'application/pdf',
    });

    const control = new FormControl(file);
    const result = imageFileValidator(control);

    expect(result).toEqual({
      invalidImageType: true,
    });
  });

  it('should accept an empty value', () => {
    const file = null;
    const control = new FormControl(file);
    const result = imageFileValidator(control);

    expect(result).toBeNull();
  });
});

describe('maxFileSizeValidator', () => {
  it('should accept a file smaller than 5 MB', () => {
    const file = new File([new Uint8Array(1024 * 1024)], 'avatar.png', {
      type: 'image/png',
    });

    const control = new FormControl(file);
    const result = maxFileSizeValidator(5 * 1024 * 1024)(control);

    expect(result).toBeNull();
  });

  it('should accept a file exactly 5 MB', () => {
    const file = new File([new Uint8Array(5 * 1024 * 1024)], 'avatar.png', {
      type: 'image/png',
    });

    const control = new FormControl(file);
    const result = maxFileSizeValidator(5 * 1024 * 1024)(control);

    expect(result).toBeNull();
  });

  it('should reject a file larger than 5 MB', () => {
    const file = new File([new Uint8Array(10 * 1024 * 1024)], 'avatar.png', {
      type: 'image/png',
    });

    const control = new FormControl(file);
    const result = maxFileSizeValidator(5 * 1024 * 1024)(control);

    expect(result).toEqual({
      maxFileSize: {
        maxSize: 5 * 1024 * 1024,
        actualSize: 10 * 1024 * 1024,
      },
    });
  });

  it('should accept an empty value', () => {
    const file = null;
    const control = new FormControl(file);
    const result = maxFileSizeValidator(5 * 1024 * 1024)(control);

    expect(result).toBeNull();
  });
});
