import {isTruthy} from '#utils/isTruthy';

export const cl = (...classNames: (string | Falsy)[]) => {
  return classNames.filter(isTruthy).join(' ');
};