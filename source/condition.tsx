import { Transition , TransitionType } from './transition';

export class Condition extends Transition {
  constructor(id: number, name: string, code: string) {
    super(id, TransitionType.Condition, name, code);
  }
}
