import dayjs from "dayjs";

/**
 * 
 * @param {Number} time - Int representing hours.
 * @returns {String} - class name to be used
 */
export const setStatus = (time) => {

  if (time <= 150) {
    return 'bad';
  }
  if (time < 400) {
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
  console.log({ start, expire, toReturn: dayjs(start).diff(expire, 'hours') });
  return dayjs(start).diff(expire, 'hour');
};

export const sortByTimeLeft = (objA, objB) => {
  const aTimeRemain = getRemainingTime(objA.startTime, objA.expireTime),
    bTimeRemain = getRemainingTime(objB.startTime, objB.expireTime);
  return aTimeRemain - bTimeRemain >= 0 ? 1 : -1;
};