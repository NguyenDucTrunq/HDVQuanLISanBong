import { Field } from './field.model';

describe('Field', () => {
  it('should create an instance of Field object', () => {
    const field: Field = {
      id: 1,
      name: 'Sân A',
      location: '123 Đường B',
      pricePerHour: 100000,
      isAvailable: true,
    };
    expect(field).toBeTruthy();
  });
});
