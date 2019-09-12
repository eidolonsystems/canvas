export interface Position {

 x: number;

 y: number;
}

export class Node {
  constructor(id: number, name: string, color: string, position: Position) {
    this._id;
    this._name = name;
    this._color = color;
    this._position = position;
  }

  public get id(): number {
    return this._id;
  }

  public set id(newID: number) {
    this._id = newID;
  }

  public get name(): string {
    return this._name;
  }

  public get color(): string {
    return this._color;
  }

  public get position(): Position {
    return this._position;
  }

  public set name(newName: string) {
    this._name = newName;
  }

  public set color(newColor: string) {
    this._color = newColor;
  }

  public set position(newPosition: Position) {
    this._position = newPosition;
  }

  private _id: number;
  private _name: string;
  private _color: string;
  private _position: Position;
}
