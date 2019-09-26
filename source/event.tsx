import { Transition , TransitionType } from './transition';

export class Event extends Transition {
  constructor(id: number, name: string, parameters: string, code: string) {
    super(id, TransitionType.Event, name, code);
    this._parameters = parameters;
  }

  public get parameters(): string {
    return this._parameters;
  }

  public set paramters(newParamters: string) {
    this._parameters = newParamters;
  }

  private _parameters: string;
}
