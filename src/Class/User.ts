export class Devie {
  constructor(data: any) {
    this.deviceId = data.id;
  }
  deviceId: "";
}
export class User {
  constructor(data: any) {
    this.info = data;

    this.devices = [
      {
        id: 0,
        name: "Device 0",
        state: false,
        currentValue: { current: 1.34, timestamp: String(new Date()) },
      },
      {
        id: 1,
        name: "Device 1",
        state: false,
        currentValue: { current: 1.34, timestamp: String(new Date()) },
      },
      {
        id: 2,
        name: "Device 2",
        state: false,
        currentValue: { current: 1.34, timestamp: String(new Date()) },
      },
      {
        id: 3,
        name: "Device 3",
        state: false,
        currentValue: { current: 1.34, timestamp: String(new Date()) },
      },
    ];
    this.isLoggedIn = true;
  }
  info: any;
  devices: Array<any>;
  isLoggedIn: boolean;
}
