export interface Pin {
  id: number;
  alias: string;
  code: number;
  startDate?: Date;
  endDate?: Date;
}

export interface PinList {
  listVersion: number;
  pins: Pin[];
}
