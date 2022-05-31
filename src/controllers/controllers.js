export const setStatus = (time) => {

  if (time <= 150) {
    return 'bad';
  }
  if (time < 400) {
    return 'warning';
  } 
  return 'good';
};

export const getRemainingTime = (start, expire) => expire - start;

export const sortByTimeLeft = (objA, objB) => {
  const aTimeRemain = getRemainingTime(objA.startTime, objA.expireTime),
    bTimeRemain = getRemainingTime(objB.startTime, objB.expireTime);
  return aTimeRemain - bTimeRemain >= 0 ? 1 : -1;
};