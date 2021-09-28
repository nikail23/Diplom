import { Flower } from './../home/flower';

function sortInAlphabeticalOrder(
  firstFlower: Flower,
  secondFlower: Flower
): number {
  if (firstFlower.name > secondFlower.name) {
    return 1;
  }
  return -1;
}

function sortAgainstAlphabeticalOrder(
  firstFlower: Flower,
  secondFlower: Flower
): number {
  if (firstFlower.name < secondFlower.name) {
    return 1;
  }
  return -1;
}

function sortInPriceOrder(
  firstFlower: Flower,
  secondFlower: Flower
): number {
  if (firstFlower.priceDto.price > secondFlower.priceDto.price) {
    return 1;
  }
  return -1;
}

function sortAgainstPriceOrder(
  firstFlower: Flower,
  secondFlower: Flower
): number {
  if (firstFlower.priceDto.price < secondFlower.priceDto.price) {
    return 1;
  }
  return -1;
}

export const sorts: ((firstFlower: Flower, secondFlower: Flower) => number)[] = [
  sortInAlphabeticalOrder,
  sortAgainstAlphabeticalOrder,
  sortInPriceOrder,
  sortAgainstPriceOrder
];
