import dayjs from "dayjs";

/**
 * 
 * @param {Number} time - Int representing hours.
 * @returns {String} - class name to be used
 */
export const setStatus = (time) => {

  if (time <= 0) {
    return 'bad';
  }
  if (time < 48) {
    return 'warning';
  } 
  return 'good';
};

/**
 * 
 * @param {String} start - Day.js compatible date
 * @param {String} expire - Day.js compatible date
 * @returns {Number} - Int representing hours
 */
export const getRemainingTime = (start, expire) => {
  console.log({ start, expire, toReturn: dayjs(expire).diff(start, 'hours') });
  return dayjs(expire).diff(start, 'hour');
};

export const sortByTimeLeft = (objA, objB) => {
  const aTimeRemain = getRemainingTime(objA.startTime, objA.expireTime),
    bTimeRemain = getRemainingTime(objB.startTime, objB.expireTime);

  console.log({ aTimeRemain, bTimeRemain });
  return aTimeRemain - bTimeRemain >= 0 ? 1 : -1;
};