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

console.log(convertMoney(.01, 4, 1));
console.log(convertMoney(.25, 14, 3));
console.log(convertMoney(5, 15, 3));
console.log(convertMoney(10, 5, 3));
console.log(convertMoney(50, 1, 2));
console.log(convertMoney(100, 15, 3));