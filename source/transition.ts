
export abstract class Transition {
  constructor(id: number, code: string) {
    this._id = id;
    this._code = code;
  }


  public get id(): number {
    return this._id;
  }

  public set id(newID: number) {
    this._id = newID;
  }

  public get code(): string {
    return this._code;
  }

  public set code(newCode: string) {
    this._code = newCode;
  }

  private _id: number;
  private _code: string;
}
