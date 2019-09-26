
export enum TransitionType {
  Event,
  Condition
}

export abstract class Transition {
  constructor(id: number, type: TransitionType, name: string, code: string) {
    this._id = id;
    this._type = type;
    this._name = name;
    this._code = code;
  }

  public get id(): number {
    return this._id;
  }

  public set id(newID: number) {
    this._id = newID;
  }

  public get type() {
    return this._type;
  }

  public set type(type: TransitionType) {
    this._type = type;
  }

  public get name(): string {
    return this._name;
  }

  public set name(newName: string) {
    this._name = newName;
  }

  public get code(): string {
    return this._code;
  }

  public set code(newCode: string) {
    this._code = newCode;
  }

  private _id: number;
  private _name: string;
  private _type: TransitionType;
  private _code: string;
}
