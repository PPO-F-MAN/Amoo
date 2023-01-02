export const get2digitNumber = (num: number) => {
  return ("0" + num).slice(-2);
};

export const getTime = (timer: number) => {
  let s = 0;
  let ms = 0;

  if (timer < 100) {
    ms = timer;
  }
  if (timer >= 100) {
    s = Math.floor(timer / 100);
    ms = timer - s * 100;
  }

  return `${get2digitNumber(s)}.${get2digitNumber(ms)}`;
};
