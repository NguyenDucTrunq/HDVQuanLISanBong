export class Field {
    id: number;
    name: string;
    location: string;
    pricePerHour: number;
    isAvailable: boolean;
  
    constructor(id: number, name: string, location: string, pricePerHour: number, isAvailable: boolean) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.pricePerHour = pricePerHour;
      this.isAvailable = isAvailable;
    }
  }
  