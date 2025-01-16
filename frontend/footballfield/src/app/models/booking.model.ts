// src/app/models/booking.model.ts
export class Booking {
    id: number;
    userId: number;
    fieldId: number;
    startTime: Date;
    endTime: Date;
    name: string;
    location: string;
    pricePerHour: number;
    isAvailable: boolean;
  
    constructor(
      id: number, 
      userId: number, 
      fieldId: number, 
      startTime: Date, 
      endTime: Date, 
      name: string, 
      location: string, 
      pricePerHour: number, 
      isAvailable: boolean
    ) {
      this.id = id;
      this.userId = userId;
      this.fieldId = fieldId;
      this.startTime = startTime;
      this.endTime = endTime;
      this.name = name;
      this.location = location;
      this.pricePerHour = pricePerHour;
      this.isAvailable = isAvailable;
    }
  }
  