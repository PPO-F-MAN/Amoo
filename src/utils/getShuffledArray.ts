export const getShuffledArray = (size: number) => {
  const shuffledArray = Array.from({ length: size }, (_, i) => i + 1);
  for (let cur = 0; cur < shuffledArray.length; cur++) {
    let tmp = Math.floor(Math.random() * (cur + 1));
    [shuffledArray[cur], shuffledArray[tmp]] = [shuffledArray[tmp], shuffledArray[cur]];
  }
  return shuffledArray;
};
