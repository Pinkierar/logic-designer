import {isTruthy} from '#utils/isTruthy';

export const classNames = (...classNames: (string | Falsy)[]) => {
  return classNames.filter(isTruthy).join(' ');
};