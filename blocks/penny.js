import { 
  totalC,
  pennyS,
  pennyB,
  pennyT,
  nickelS,
  nickelB,
  nickelT,
  dimeS,
  dimeB,
  dimeT,
  quarterS,
  quarterB,
  quarterT,
  billS,
  billB,
  billT,
  billFiveS,
  billFiveB,
  billFiveT,
  billTenS,
  billTenB,
  billTenT,
  redBagT,
  billTwentyS,
  billFiftyS,
  billHundredS 
} from "./constants.js";

function convertMoney(val, one, two) {
  let total = 0;
  switch(val) {
    case .01:
    case .10:
      while (one > 0) {
        total += (val * 50);
        one -= 1;
      }
      while (two > 0) {
        total += (val * 2500);
        two -= 1;
      }
      break;
    case .05:
    case .25:
      while (one > 0) {
        total += (val * 40);
        one -= 1;
      }
      while (two > 0) {
        total += (val * 2000);
        two -= 1;
      }
      break;
    case 1:
    case 5:
    case 20:
      while (one > 0) {
        total += val;
        one -= 1;
      }
      while (two > 0) {
        total += (100 * val);
        two -= 1;
      }
      break;
    case 10:
      while (one > 0) {
        total += val;
        one -= 1;
      }
      while (two > 0) {
        total += (10 * val);
        two -= 1;
      }
      break;
    case 50:
    case 100:
      while (one > 0) {
        total += val;
        one -= 1;
      }
      while (two > 0) {
        total += (20 * val);
        two -= 1;
      }
      break;
  }
  return total;
}

var totalCount = 0;
totalC.innerHTML = "$" + totalCount;


var pennySCount = 0;
pennyS.value = pennySCount;

var pennyBCount = 0;
pennyB.value = pennyBCount;


var pennyTCount = convertMoney(.01, pennySCount, pennyBCount);
pennyT.innerHTML = "$" + pennyTCount;

function handlePennyS(evt) {
  evt.preventDefault();
  pennySCount = pennyS.value;
  pennyTCount = convertMoney(.01, pennySCount, pennyBCount);
  pennyT.innerHTML = "$" + pennyTCount;
}

function handlePennyB(evt) {
  evt.preventDefault();
  pennyBCount = pennyB.value;
  pennyTCount = convertMoney(.01, pennySCount, pennyBCount);
  pennyT.innerHTML = "$" + pennyTCount;
}

pennyS.addEventListener("change", handlePennyS);
pennyB.addEventListener("change", handlePennyB);


var nickelSCount = 0;
nickelS.value = nickelSCount;

var nickelBCount = 0;
nickelB.value = nickelBCount;

var nickelTCount = convertMoney(.05, nickelSCount, nickelBCount);
nickelT.innerHTML = "$" + nickelTCount;

function handleNickelS(evt) {
  evt.preventDefault();
  nickelSCount = nickelS.value;
  nickelTCount = convertMoney(.05, nickelSCount, nickelBCount);
  nickelT.innerHTML = "$" + nickelTCount;
}

function handleNickelB(evt) {
  evt.preventDefault();
  nickelBCount = nickelB.value;
  nickelTCount = convertMoney(.05, nickelSCount, nickelBCount);
  nickelT.innerHTML = "$" + nickelTCount;
}

nickelS.addEventListener("change", handleNickelS);
nickelB.addEventListener("change", handleNickelB);

var dimeSCount = 0;
dimeS.value = dimeSCount;

var dimeBCount = 0;
dimeB.value = dimeBCount;

var dimeTCount = convertMoney(.10, dimeSCount, dimeBCount);
dimeT.innerHTML = "$" + dimeTCount;

function handledimeS(evt) {
  evt.preventDefault();
  dimeSCount = dimeS.value;
  dimeTCount = convertMoney(.10, dimeSCount, dimeBCount);
  dimeT.innerHTML = "$" + dimeTCount;
}

function handledimeB(evt) {
  evt.preventDefault();
  dimeBCount = dimeB.value;
  dimeTCount = convertMoney(.10, dimeSCount, dimeBCount);
  dimeT.innerHTML = "$" + dimeTCount;
}

dimeS.addEventListener("change", handledimeS);
dimeB.addEventListener("change", handledimeB);

var quarterSCount = 0;
quarterS.value = quarterSCount;

var quarterBCount = 0;
quarterB.value = quarterBCount;

var quarterTCount = convertMoney(.25, quarterSCount, quarterBCount);
quarterT.innerHTML = "$" + quarterTCount;

function handlequarterS(evt) {
  evt.preventDefault();
  quarterSCount = quarterS.value;
  quarterTCount = convertMoney(.25, quarterSCount, quarterBCount);
  quarterT.innerHTML = "$" + quarterTCount;
}

function handlequarterB(evt) {
  evt.preventDefault();
  quarterBCount = quarterB.value;
  quarterTCount = convertMoney(.25, quarterSCount, quarterBCount);
  quarterT.innerHTML = "$" + quarterTCount;
}

quarterS.addEventListener("change", handlequarterS);
quarterB.addEventListener("change", handlequarterB);

var billSCount = 0;
billS.value = billSCount;

var billBCount = 0;
billB.value = billBCount;

var billTCount = convertMoney(1, billSCount, billBCount);
billT.innerHTML = "$" + billTCount;

function handlebillS(evt) {
  evt.preventDefault();
  billSCount = billS.value;
  billTCount = convertMoney(1, billSCount, billBCount);
  billT.innerHTML = "$" + billTCount;
}

function handlebillB(evt) {
  evt.preventDefault();
  billBCount = billB.value;
  billTCount = convertMoney(1, billSCount, billBCount);
  billT.innerHTML = "$" + billTCount;
}

billS.addEventListener("change", handlebillS);
billB.addEventListener("change", handlebillB);

var billFiveSCount = 0;
billFiveS.value = billFiveSCount;

var billFiveBCount = 0;
billFiveB.value = billFiveBCount;

var billFiveTCount = convertMoney(5, billFiveSCount, billFiveBCount);
billFiveT.innerHTML = "$" + billFiveTCount;

function handlebillFiveS(evt) {
  evt.preventDefault();
  billFiveSCount = billFiveS.value;
  billFiveTCount = convertMoney(5, billFiveSCount, billFiveBCount);
  billFiveT.innerHTML = "$" + billFiveTCount;
}

function handlebillFiveB(evt) {
  evt.preventDefault();
  billFiveBCount = billFiveB.value;
  billFiveTCount = convertMoney(5, billFiveSCount, billFiveBCount);
  billFiveT.innerHTML = "$" + billFiveTCount;
}

billFiveS.addEventListener("change", handlebillFiveS);
billFiveB.addEventListener("change", handlebillFiveB);

var billTenSCount = 0;
billTenS.value = billTenSCount;

var billTenBCount = 0;
billTenB.value = billTenBCount;

var billTenTCount = convertMoney(10, billTenSCount, billTenBCount);
billTenT.innerHTML = "$" + billTenTCount;

function handlebillTenS(evt) {
  evt.preventDefault();
  billTenSCount = billTenS.value;
  billTenTCount = convertMoney(10, billTenSCount, billTenBCount);
  billTenT.innerHTML = "$" + billTenTCount;
}

function handlebillTenB(evt) {
  evt.preventDefault();
  billTenBCount = billTenB.value;
  billTenTCount = convertMoney(10, billTenSCount, billTenBCount);
  billTenT.innerHTML = "$" + billTenTCount;
}

billTenS.addEventListener("change", handlebillTenS);
billTenB.addEventListener("change", handlebillTenB);

let redBagTotal = 0;
redBagT.innerHTML = "$" + redBagTotal;

const redBag = () => {
  redBagTotal = (billTwentyTCount + billFiftyTCount + billHundredTCount);
  redBagT.innerHTML = "$" + redBagTotal;
}

var billTwentySCount = 0;
billTwentyS.value = billTwentySCount;
var billTwentyTCount = convertMoney(20, billTwentySCount, 0);

function handlebillTwentyS(evt) {
  evt.preventDefault();
  billTwentySCount = billTwentyS.value;
  billTwentyTCount = convertMoney(20, billTwentySCount, 0);
  redBag();
}

billTwentyS.addEventListener("change", handlebillTwentyS);

var billFiftySCount = 0;
billFiftyS.value = billFiftySCount;
var billFiftyTCount = convertMoney(50, billFiftySCount, 0);

function handlebillFiftyS(evt) {
  evt.preventDefault();
  billFiftySCount = billFiftyS.value;
  billFiftyTCount = convertMoney(50, billFiftySCount, 0);
  redBag();
}

billFiftyS.addEventListener("change", handlebillFiftyS);

var billHundredSCount = 0;
billHundredS.value = billHundredSCount;
var billHundredTCount = convertMoney(100, billHundredSCount, 0);

function handlebillHundredS(evt) {
  evt.preventDefault();
  billHundredSCount = billHundredS.value;
  billHundredTCount = convertMoney(100, billHundredSCount, 0);
  redBag();
}

billHundredS.addEventListener("change", handlebillHundredS);


const cumulative = () => {
  totalCount = (billHundredTCount + billFiftyTCount + billTwentyTCount + billTenTCount + billFiveTCount + billTCount + quarterTCount + dimeTCount + nickelTCount + pennyTCount);
  totalC.innerHTML = "$" + totalCount;
  checkConfirmation();
}

pennyS.addEventListener("change", cumulative);
pennyB.addEventListener("change", cumulative);
nickelS.addEventListener("change", cumulative);
nickelB.addEventListener("change", cumulative);
dimeS.addEventListener("change", cumulative);
dimeB.addEventListener("change", cumulative);
quarterS.addEventListener("change", cumulative);
quarterB.addEventListener("change", cumulative);
billS.addEventListener("change", cumulative);
billB.addEventListener("change", cumulative);
billFiveS.addEventListener("change", cumulative);
billFiveB.addEventListener("change", cumulative);
billTenS.addEventListener("change", cumulative);
billTenB.addEventListener("change", cumulative);
billTwentyS.addEventListener("change", cumulative);
billFiftyS.addEventListener("change", cumulative);
billHundredS.addEventListener("change", cumulative);