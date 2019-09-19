export interface Position {

 x: number;

 y: number;
}

export class Node {
  constructor(id: number, name: string, color: string, position: Position) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._position = position;
    this._code = '';
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(newName: string) {
    this._name = newName;
  }

  public get color(): string {
    return this._color;
  }

  public set color(newColor: string) {
    this._color = newColor;
  }

  public get position(): Position {
    return this._position;
  }

  public set position(newPosition: Position) {
    this._position = newPosition;
  }

  public get code(): string {
    return this._code;
  }

  public set code(newCode: string) {
    this._code = newCode;
  }

  private _id: number;
  private _name: string;
  private _color: string;
  private _position: Position;
  private _code: string;
}
