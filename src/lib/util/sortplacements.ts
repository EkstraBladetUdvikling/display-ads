export const sortPlacements = (banA: any, banB: any) => {
  if (banA.name > banB.name) {
    return 1;
  } else if (banA.name < banB.name) {
    return -1;
  }
  return 0;
};
