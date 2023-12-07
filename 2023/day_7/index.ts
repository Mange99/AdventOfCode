import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const hands: { hand: string; value: number; bet: number }[] = data
    .split("\n")
    .map((line) => {
      const [hand, bid] = line.split(" ");
      const bet = Number(bid);
      return { hand, value: handValue(hand), bet };
    });

  return sortAndCalcSum(hands, { A: 14, K: 13, Q: 12, J: 11, T: 10 });
};

const part2 = (data: string) => {
  const hands: { hand: string; value: number; bet: number }[] = data
    .split("\n")
    .map((line) => {
      const [hand, bid] = line.split(" ");
      const bet = Number(bid);
      return { hand, value: countPairs2(hand), bet };
    });

  return sortAndCalcSum(hands, { A: 14, K: 13, Q: 12, J: 1, T: 10 });
};

const handValue = (cards: string): number => {
  const cardCount: Record<string, number> = {};

  cards.split("").forEach((card) => {
    cardCount[card] = (cardCount[card] || 0) + 1;
  });

  return getValue(cardCount);
};

const countPairs2 = (cards: string) => {
  let cardCount: Record<string, number> = {};

  cards.split("").forEach((card) => {
    if (card != "J") {
      cardCount[card] = (cardCount[card] || 0) + 1;
    }
  });

  let newCards = getStrongerHand(cards, cardCount);

  cardCount = {};

  newCards.split("").forEach((card) => {
    cardCount[card] = (cardCount[card] || 0) + 1;
  });

  return getValue(cardCount);
};

const getValue = (cardCount: Record<string, number>): number => {
  let fives = Object.values(cardCount).filter((count) => count === 5).length;
  let fours = Object.values(cardCount).filter((count) => count === 4).length;
  let threes = Object.values(cardCount).filter((count) => count === 3).length;
  let pairs = Object.values(cardCount).filter((count) => count === 2).length;

  if (fives === 1) return 6;
  if (fours === 1) return 5;
  if (threes === 1 && pairs === 1) return 4;
  if (threes === 1) return 3;
  if (pairs === 2) return 2;
  if (pairs === 1) return 1;
  return 0;
};

const sortAndCalcSum = (
  hands: { hand: string; value: number; bet: number }[],
  cards: Record<string, number>
) => {
  const sorted = hands.sort((a, b) => {
    if (b.value - a.value !== 0) return b.value - a.value;
    let index = 0;
    for (let i = 0; i < 5; i++) {
      const indexA = cards[a.hand[i]] ?? Number(a.hand[i]);
      const indexB = cards[b.hand[i]] ?? Number(b.hand[i]);

      if (indexA !== indexB) {
        return indexB - indexA;
      }
    }
    return index;
  });

  return sorted.reduce(
    (prev, curr, index) => prev + (sorted.length - index) * curr.bet,
    0
  );
};

const getStrongerHand = (cards: string, cardCount: Record<string, number>) => {
  const jokers = cards.split("").filter((c) => c === "J").length;
  if (jokers < 1) return cards;

  for (const [label, count] of Object.entries(cardCount)) {
    if (count + jokers === 5 || count + jokers === 4) {
      return cards.replaceAll("J", label);
    }
  }

  for (const [label, count] of Object.entries(cardCount)) {
    if (count === 2) {
      for (const [secondLabel, secondCount] of Object.entries(cardCount)) {
        if (secondCount === 2 && secondLabel !== label) {
          return cards.replaceAll("J", label);
        }
      }
    }
  }
  for (const [label, count] of Object.entries(cardCount)) {
    if (count + jokers === 3) {
      return cards.replaceAll("J", label);
    }
  }
  for (const [label, count] of Object.entries(cardCount)) {
    if (count == 2) {
      for (const [secondLabel, secondCount] of Object.entries(cardCount)) {
        if (secondCount == 1) {
          return cards.replaceAll("J", secondLabel);
        }
      }
    }
  }
  for (const [label, count] of Object.entries(cardCount)) {
    if (count === 1) {
      return cards.replaceAll("J", label);
    }
  }
  return cards;
};

// 251545216
Timed(1, () => part1(data));
//250384185
Timed(2, () => part2(data));
