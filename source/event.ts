import { Transition } from './transition';

export class Event extends Transition {
  public constructor(id: number, code: string) {
    super(id, code);
  }
}
