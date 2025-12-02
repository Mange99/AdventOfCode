import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const invalidId = (value: string) => {
  const firstNum = Number(value.substring(0,1))

  if(firstNum == 0){
    return true;
  }

  for(let i = 0; i < value.length; i++){
    const firstPart = value.substring(0, i);
    const secondPart = value.substring(i);
    if(firstPart == secondPart)
      return true;
  }
  return false;
}

const part1 = (data: string) => {
  const ids = data.split(",")
  
  return ids.reduce((prev, curr) => {
    const [firstId, lastId ] = curr.split("-")

    const firstNum = Number(firstId)
    const lastNum = Number(lastId)

    for(let i = firstNum; i <= lastNum; i++){
      
      if(invalidId(i.toString()) ) {
        prev += i;
      }
      
    }
      return prev;

  }, 0)
};


const isInvalidID = (value: string) => {
  const maxLength = Math.floor(value.length / 2);

  for (let i = 1; i <= maxLength; i++) {
    
    if (value.length % i !== 0) {
      continue; 
    }
    
    const currentPattern = value.slice(0, i);

    const repitition = value.length / i;

    if (repitition < 2) return false;

    let newValue = "";

    for(let i = 0; i < repitition; i++){
      newValue+= currentPattern;
    }

    if(newValue == value){
      return true;
    }
  }
}



const part2 = (data: string) => {
  const ids = data.split(",")
  
  return ids.reduce((prev, curr) => {
    const [firstId, lastId] = curr.split("-")

    const firstNum = Number(firstId)
    const lastNum = Number(lastId)

    for(let i = firstNum; i <= lastNum; i++){
      
      if(isInvalidID(i.toString()) ) {
        
        prev += i;
      }
      
    }
    return prev;
  }, 0)
};


console.log(part1(data))
console.log(part2(data))
// Timed(1, () => part1(data));
// Timed(2, () => part2(data));



