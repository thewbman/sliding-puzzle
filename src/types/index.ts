export interface Position {
  x: number;
  y: number;
}

export interface BoardSetup {
  rowCount: number;
  columnCount: number;
  aspectRatio: number;
  randomHolePlacement: boolean;
  imageUrl?: string;
}

export interface ScreenSize {
    width: number;
    height: number;
}
