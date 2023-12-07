import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const cards = ["A", "K", "D", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

type Hand = {hand: string, value: number, bid: number};

const countPairs = (cards: string, bid: number): Hand => {
  const cardCount: Record<string, number> = {};

  cards.split("").forEach(card => {
      if (card in cardCount) {
          cardCount[card]++;
      } else {
          cardCount[card] = 1;
      }
  });
  
  if(Object.keys(cardCount).length == 1) {
    return {hand: cards, value: 6, bid: bid} as Hand
  }

  const first = Object.values(cardCount)[0];
  const second = Object.values(cardCount)[1];

  if(first == 3 && second == 2 || first == 2 && second == 3) {
    return {hand: cards, value: 4, bid: bid} as Hand
  }  

  if(Object.keys(cardCount).length == 2) {
    return {hand: cards, value: 5, bid: bid} as Hand

  }
  if(Object.values(cardCount).includes(3)){
    return {hand: cards, value: 3, bid: bid} as Hand
  }
  
  let pairs = 0;
  if(Object.values(cardCount).map((value) => {
    if(value == 2) pairs++;
  }))

  return {hand: cards, value: pairs, bid: bid} as Hand;
  return {hand: cards, value: pairs, bid: bid} as Hand;
  

}
const part1 = (data: string) => {
  const hands = data
    .split("\n")
    .map((line) => {
      const [hand, bid] = line.split(" ");
      return countPairs(hand, Number(bid))
    })


    const sorted = hands.sort((a, b) => {
      // First, compare by the 'value' property
      if (b.value - a.value !== 0) {
        return b.value - a.value; // Sort by 'value' in descending order
      } 
      let indexA = 0;
      let indexB = 0;
    
      // If 'value' is the same, compare by the highest card in the hand
      for (let i = 0; i < Math.min(a.hand.length, b.hand.length); i++) {
        const cardA = a.hand[i];
        const cardB = b.hand[i];
    
        indexA = cards.indexOf(cardA);
         indexB = cards.indexOf(cardB);
    
        if (indexA !== indexB) {
          return indexA - indexB;
        }
      }
    
      return indexA - indexB;
    });


    for(let i = 0; i < sorted.length; i++){
      sorted[sorted.length-1-i].value = i+1;
    }

    log(sorted)

    return sorted.reduce((prev, curr) => prev + curr.value * curr.bid, 0);

  };




const part2 = (data: string) => {
  data.split("\n\n").map((value) => {
    console.log(value);
  });
};

console.log(part1(data));
//  console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
