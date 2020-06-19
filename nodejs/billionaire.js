const list = require('./billionaire_list').list.split("\n");

class Person {
  toString() {
    return `${this.rank} ${this.name} ${this.citizenship} ${this.age} ${this.worth} ${this.source}`;
  }
}

class CountryBalance {
  constructor() {
    this.name       = '';
    this.billionaire = 0;
    this.worth      = 0;
  }

  toString() {
    return `${this.name} ${this.billionaire} ${this.worth.toFixed(2)}`;
  }
}

let splitString = (x, y) => {
  let i = 0, j = 0;
  let split = [];

  for (let k = 0; k < x.length; ++k)
  {

    let c = x[k];

    if (y === c) {
      split.push(x.substring(j, j+ i - j));
      ++i;
      j = i;
      continue;
    }
    ++i;
    if (i === x.length)
      split.push(x.substring(j, j + i - j));
  }
  return split;
}


let setPerson = (listRecord, person) => {
  split = splitString(listRecord, '\t');
  if (split.length < 6) {
    return false;
  }
  setPartsToPerson(split, person);
  return true;
}

let setPartsToPerson = (split, person) => {
  person.rank = parseInt(split[0]);
  person.name = split[1];
  person.citizenship = split[2];
  person.age = parseInt(split[3]);
  person.worth = parseFloat(split[4]);
  person.source = split[5];
}

let data = [];

for(let lineNr = 5; lineNr < list.length; lineNr += 2) {
  let record = list[lineNr];
  let person = new Person();
  if (setPerson(record, person)) {
    data.push(person);
  }
}
console.log("loaded Records = " + data.length);
let balance = 0.0;
for (let count = 0; count < data.length; ++count) {
  if (data[count].worth > 0) balance += data[count].worth;
}
console.log("Balance over all = " + balance + " billions US$");
let avgAge = 0.0;
for (let count = 0; count < data.length; ++count) {
  if (data[count].age > 0) avgAge += data[count].age;
}
avgAge = avgAge / data.length;
console.log("average age over all = " + avgAge);
let avgBalance = 0.0;
for (let count = 0; count < data.length; ++count) {
  if (data[count].worth > 0) avgBalance += data[count].worth;
}
avgBalance = avgBalance / data.length;
console.log("average balance over all = " + avgBalance + " billions US$");
console.log("\n**** Top 10 ****");
let data2 = [];

let c1 = 0;
for (; c1 < data.length; ++c1) {
  let c2 = 0;
  for (; c2 < Math.min(data2.length, 10); ++c2)
  {
    if (data[c1].worth > data2[c2].worth) {
      break;
    }
  }
  data2.splice(c2, 0, data[c1]);
}

for (let count = 0; count < 10; ++count) {
  if (count < data2.length)
    console.log(data2[count].toString());
}

console.log("\n*** country balance ***");
data3 = [];
for (let count = 0, end = data.length; count < end; ++count) {
  let p1 = data[count];

  let found = null;
  for (let count2 = 0, end2 = data3.length; count2 < end2; ++count2) {
    if (p1.citizenship === data3[count2].name) {
      found = data3[count2];
      break;
    }
  }
  if (found === null) {
    found = new CountryBalance();
    found.name = p1.citizenship;
    data3.push(found);
  }
  found.billionaire += 1;
  found.worth += p1.worth;

}

data4 = [];
for (let count = 0; count < data3.length; ++count) {
  let count2 = 0;
  for (; count2 < data4.length; ++count2) {
    if (data3[count].worth > data4[count2].worth) {
      break;
    }
  }
  data4.splice(count2, 0, data3[count]);
}

for (let count = 0; count < data4.length; ++count) {
  console.log(data4[count].toString());
}
