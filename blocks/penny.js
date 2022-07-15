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
const totalC = document.getElementById("totalCount");
totalC.innerHTML = "$" + totalCount;

const pennyS = document.getElementById("pennyS");
const pennySForm = document.getElementById("pennySForm");
var pennySCount = 0;
pennyS.value = pennySCount;

const pennyB = document.getElementById("pennyB");
const pennyBForm = document.getElementById("pennyBForm");
var pennyBCount = 0;
pennyB.value = pennyBCount;

const pennyT = document.getElementById("pennyT");
var pennyTCount = convertMoney(.01, pennySCount, pennyBCount);
pennyT.innerHTML = "$" + pennyTCount;

function handlePennySForm(evt) {
  evt.preventDefault();
  pennySCount = pennyS.value;
  pennyTCount = convertMoney(.01, pennySCount, pennyBCount);
  pennyT.innerHTML = "$" + pennyTCount;
}

function handlePennyBForm(evt) {
  evt.preventDefault();
  pennyBCount = pennyB.value;
  pennyTCount = convertMoney(.01, pennySCount, pennyBCount);
  pennyT.innerHTML = "$" + pennyTCount;
}

pennySForm.addEventListener("change", handlePennySForm);
pennySForm.addEventListener("submit", function(event){event.preventDefault()});
pennyBForm.addEventListener("change", handlePennyBForm);
pennyBForm.addEventListener("submit", function(event){event.preventDefault()});

const nickelS = document.getElementById("nickelS");
const nickelSForm = document.getElementById("nickelSForm");
var nickelSCount = 0;
nickelS.value = nickelSCount;

const nickelB = document.getElementById("nickelB");
const nickelBForm = document.getElementById("nickelBForm");
var nickelBCount = 0;
nickelB.value = nickelBCount;

const nickelT = document.getElementById("nickelT");
var nickelTCount = convertMoney(.05, nickelSCount, nickelBCount);
nickelT.innerHTML = "$" + nickelTCount;

function handleNickelSForm(evt) {
  evt.preventDefault();
  nickelSCount = nickelS.value;
  nickelTCount = convertMoney(.05, nickelSCount, nickelBCount);
  nickelT.innerHTML = "$" + nickelTCount;
}

function handleNickelBForm(evt) {
  evt.preventDefault();
  nickelBCount = nickelB.value;
  nickelTCount = convertMoney(.05, nickelSCount, nickelBCount);
  nickelT.innerHTML = "$" + nickelTCount;
}

nickelSForm.addEventListener("change", handleNickelSForm);
nickelSForm.addEventListener("submit", function(event){event.preventDefault()});
nickelBForm.addEventListener("change", handleNickelBForm);
nickelBForm.addEventListener("submit", function(event){event.preventDefault()});

const dimeS = document.getElementById("dimeS");
const dimeSForm = document.getElementById("dimeSForm");
var dimeSCount = 0;
dimeS.value = dimeSCount;

const dimeB = document.getElementById("dimeB");
const dimeBForm = document.getElementById("dimeBForm");
var dimeBCount = 0;
dimeB.value = dimeBCount;

const dimeT = document.getElementById("dimeT");
var dimeTCount = convertMoney(.10, dimeSCount, dimeBCount);
dimeT.innerHTML = "$" + dimeTCount;

function handledimeSForm(evt) {
  evt.preventDefault();
  dimeSCount = dimeS.value;
  dimeTCount = convertMoney(.10, dimeSCount, dimeBCount);
  dimeT.innerHTML = "$" + dimeTCount;
}

function handledimeBForm(evt) {
  evt.preventDefault();
  dimeBCount = dimeB.value;
  dimeTCount = convertMoney(.10, dimeSCount, dimeBCount);
  dimeT.innerHTML = "$" + dimeTCount;
}

dimeSForm.addEventListener("change", handledimeSForm);
dimeSForm.addEventListener("submit", function(event){event.preventDefault()});
dimeBForm.addEventListener("change", handledimeBForm);
dimeBForm.addEventListener("submit", function(event){event.preventDefault()});

const quarterS = document.getElementById("quarterS");
const quarterSForm = document.getElementById("quarterSForm");
var quarterSCount = 0;
quarterS.value = quarterSCount;

const quarterB = document.getElementById("quarterB");
const quarterBForm = document.getElementById("quarterBForm");
var quarterBCount = 0;
quarterB.value = quarterBCount;

const quarterT = document.getElementById("quarterT");
var quarterTCount = convertMoney(.25, quarterSCount, quarterBCount);
quarterT.innerHTML = "$" + quarterTCount;

function handlequarterSForm(evt) {
  evt.preventDefault();
  quarterSCount = quarterS.value;
  quarterTCount = convertMoney(.25, quarterSCount, quarterBCount);
  quarterT.innerHTML = "$" + quarterTCount;
}

function handlequarterBForm(evt) {
  evt.preventDefault();
  quarterBCount = quarterB.value;
  quarterTCount = convertMoney(.25, quarterSCount, quarterBCount);
  quarterT.innerHTML = "$" + quarterTCount;
}

quarterSForm.addEventListener("change", handlequarterSForm);
quarterSForm.addEventListener("submit", function(event){event.preventDefault()});
quarterBForm.addEventListener("change", handlequarterBForm);
quarterBForm.addEventListener("submit", function(event){event.preventDefault()});

const billS = document.getElementById("billS");
const billSForm = document.getElementById("billSForm");
var billSCount = 0;
billS.value = billSCount;

const billB = document.getElementById("billB");
const billBForm = document.getElementById("billBForm");
var billBCount = 0;
billB.value = billBCount;

const billT = document.getElementById("billT");
var billTCount = convertMoney(1, billSCount, billBCount);
billT.innerHTML = "$" + billTCount;

function handlebillSForm(evt) {
  evt.preventDefault();
  billSCount = billS.value;
  billTCount = convertMoney(1, billSCount, billBCount);
  billT.innerHTML = "$" + billTCount;
}

function handlebillBForm(evt) {
  evt.preventDefault();
  billBCount = billB.value;
  billTCount = convertMoney(1, billSCount, billBCount);
  billT.innerHTML = "$" + billTCount;
}

billSForm.addEventListener("change", handlebillSForm);
billSForm.addEventListener("submit", function(event){event.preventDefault()});
billBForm.addEventListener("change", handlebillBForm);
billBForm.addEventListener("submit", function(event){event.preventDefault()});

const billFiveS = document.getElementById("billFiveS");
const billFiveSForm = document.getElementById("billFiveSForm");
var billFiveSCount = 0;
billFiveS.value = billFiveSCount;

const billFiveB = document.getElementById("billFiveB");
const billFiveBForm = document.getElementById("billFiveBForm");
var billFiveBCount = 0;
billFiveB.value = billFiveBCount;

const billFiveT = document.getElementById("billFiveT");
var billFiveTCount = convertMoney(5, billFiveSCount, billFiveBCount);
billFiveT.innerHTML = "$" + billFiveTCount;

function handlebillFiveSForm(evt) {
  evt.preventDefault();
  billFiveSCount = billFiveS.value;
  billFiveTCount = convertMoney(5, billFiveSCount, billFiveBCount);
  billFiveT.innerHTML = "$" + billFiveTCount;
}

function handlebillFiveBForm(evt) {
  evt.preventDefault();
  billFiveBCount = billFiveB.value;
  billFiveTCount = convertMoney(5, billFiveSCount, billFiveBCount);
  billFiveT.innerHTML = "$" + billFiveTCount;
}

billFiveSForm.addEventListener("change", handlebillFiveSForm);
billFiveSForm.addEventListener("submit", function(event){event.preventDefault()});
billFiveBForm.addEventListener("change", handlebillFiveBForm);
billFiveBForm.addEventListener("submit", function(event){event.preventDefault()});

const billTenS = document.getElementById("billTenS");
const billTenSForm = document.getElementById("billTenSForm");
var billTenSCount = 0;
billTenS.value = billTenSCount;

const billTenB = document.getElementById("billTenB");
const billTenBForm = document.getElementById("billTenBForm");
var billTenBCount = 0;
billTenB.value = billTenBCount;

const billTenT = document.getElementById("billTenT");
var billTenTCount = convertMoney(10, billTenSCount, billTenBCount);
billTenT.innerHTML = "$" + billTenTCount;

function handlebillTenSForm(evt) {
  evt.preventDefault();
  billTenSCount = billTenS.value;
  billTenTCount = convertMoney(10, billTenSCount, billTenBCount);
  billTenT.innerHTML = "$" + billTenTCount;
}

function handlebillTenBForm(evt) {
  evt.preventDefault();
  billTenBCount = billTenB.value;
  billTenTCount = convertMoney(10, billTenSCount, billTenBCount);
  billTenT.innerHTML = "$" + billTenTCount;
}

billTenSForm.addEventListener("change", handlebillTenSForm);
billTenSForm.addEventListener("submit", function(event){event.preventDefault()});
billTenBForm.addEventListener("change", handlebillTenBForm);
billTenBForm.addEventListener("submit", function(event){event.preventDefault()});

let redBagTotal = 0;
const redBagT = document.getElementById("redBagTotal");
redBagT.innerHTML = "$" + redBagTotal;

const redBag = () => {
  redBagTotal = (billTwentyTCount + billFiftyTCount + billHundredTCount);
  redBagT.innerHTML = "$" + redBagTotal;
}

const billTwentyS = document.getElementById("billTwentyS");
const billTwentySForm = document.getElementById("billTwentySForm");
var billTwentySCount = 0;
billTwentyS.value = billTwentySCount;
var billTwentyTCount = convertMoney(20, billTwentySCount, 0);

function handlebillTwentySForm(evt) {
  evt.preventDefault();
  billTwentySCount = billTwentyS.value;
  billTwentyTCount = convertMoney(20, billTwentySCount, 0);
  redBag();
}

billTwentySForm.addEventListener("change", handlebillTwentySForm);
billTwentySForm.addEventListener("submit", function(event){event.preventDefault()});

const billFiftyS = document.getElementById("billFiftyS");
const billFiftySForm = document.getElementById("billFiftySForm");
var billFiftySCount = 0;
billFiftyS.value = billFiftySCount;
var billFiftyTCount = convertMoney(50, billFiftySCount, 0);

function handlebillFiftySForm(evt) {
  evt.preventDefault();
  billFiftySCount = billFiftyS.value;
  billFiftyTCount = convertMoney(50, billFiftySCount, 0);
  redBag();
}

billFiftySForm.addEventListener("change", handlebillFiftySForm);
billFiftySForm.addEventListener("submit", function(event){event.preventDefault()});

const billHundredS = document.getElementById("billHundredS");
const billHundredSForm = document.getElementById("billHundredSForm");
var billHundredSCount = 0;
billHundredS.value = billHundredSCount;
var billHundredTCount = convertMoney(100, billHundredSCount, 0);

function handlebillHundredSForm(evt) {
  evt.preventDefault();
  billHundredSCount = billHundredS.value;
  billHundredTCount = convertMoney(100, billHundredSCount, 0);
  redBag();
}

billHundredSForm.addEventListener("change", handlebillHundredSForm);
billHundredSForm.addEventListener("submit", function(event){event.preventDefault()});


const cumulative = () => {
  totalCount = (billHundredTCount + billFiftyTCount + billTwentyTCount + billTenTCount + billFiveTCount + billTCount + quarterTCount + dimeTCount + nickelTCount + pennyTCount);
  totalC.innerHTML = "$" + totalCount;
  checkConfirmation();
}

pennySForm.addEventListener("change", cumulative);
pennyBForm.addEventListener("change", cumulative);
nickelSForm.addEventListener("change", cumulative);
nickelBForm.addEventListener("change", cumulative);
dimeSForm.addEventListener("change", cumulative);
dimeBForm.addEventListener("change", cumulative);
quarterSForm.addEventListener("change", cumulative);
quarterBForm.addEventListener("change", cumulative);
billSForm.addEventListener("change", cumulative);
billBForm.addEventListener("change", cumulative);
billFiveSForm.addEventListener("change", cumulative);
billFiveBForm.addEventListener("change", cumulative);
billTenSForm.addEventListener("change", cumulative);
billTenBForm.addEventListener("change", cumulative);
billTwentySForm.addEventListener("change", cumulative);
billFiftySForm.addEventListener("change", cumulative);
billHundredSForm.addEventListener("change", cumulative);