let valArr = {
  "PENNY":0.01,
  "NICKEL":0.05,
  "DIME":0.1,
  "QUARTER":0.25,
  "ONE":1,
  "FIVE":5,
  "TEN":10,
  "TWENTY":20,
  "HUNDRED":100
};

const keys = Object.keys(valArr);

function checkCashRegister(price, cash, cid) {
  var changes = []; //returning cash stack is to be pushed in this array

  let diff = cash - price; //balance to be returned

  //limit is starting point to start adding up amount to return
  let limit = keys.findIndex(key => key === keys.find( key=> valArr[key] > diff));
  //when the differene greater than 100
  if(limit === 0)
    limit = 9;

  let i = limit -1, flag=0;

  //first checking for insufficient balance
  let sum =0;
  cid.forEach(arr => {

    sum = sum + arr[1];
  });

  if(sum < diff)
    return {status:"INSUFFICIENT_FUNDS",change:[]};
  else if(sum === diff)
    return {status:"CLOSED",change:cid}; //if returning balance is equal to availbale balance

  //now if the funds are not insufficient
  while(i>=0){
    if(diff===0)
      break;

    //factor of the amount to be returned for a currency
    let mul = Math.floor(diff / valArr[keys[i]]);

    cid.forEach(arr => {
      if(arr[0] === keys[i]){
        if(arr[1] < (mul * valArr[keys[i]]) && arr[1] != 0 ){
          /*if cash in drawer is less than the possible payment take all also that the availbale
          balance is not zero then dont include it in returning stack*/
          diff = diff - arr[1];
          changes.push([arr[0], arr[1]]);
        }else if(arr[1] != 0 && arr[1] >= (mul * valArr[keys[i]]) && (mul * valArr[keys[i]])!=0 )
        {
          diff = diff - (mul * valArr[keys[i]]);
          changes.push([arr[0], ( mul * valArr[keys[i]] ) ]);
        }
      }
    });


    i--;
  }

  if(diff<1 && diff>0){
    changes.forEach(ar => {
      if(ar[0]==="PENNY"){
        ar[1] = ar[1]+.01;
        diff=0;
      }
    });
  }

  sum =0;
  changes.forEach(arr => {
    sum = sum + arr[1];
  });


  if(sum < cash - price)
    return {status:"INSUFFICIENT_FUNDS",change:[]};

  if(diff === 0)
    return {status:"OPEN",change:changes};

}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]


let cashDrawer = document.querySelectorAll('.cashDrawer');

let cashArr = [];
let cost, received;

function main(){
  cashArr = [];
  cashDrawer[0].childNodes.forEach( pocket => {
    if(pocket.type === 'number')
      cashArr.push(parseInt(pocket.value));
  });
  
  cost = document.querySelector('#registerInp1').value;
  received = document.querySelector('#registerInp2').value;
  
  let res = checkCashRegister(cost, received, [["PENNY", 0.01 * cashArr[0]], ["NICKEL", 0.05 * cashArr[1]], ["DIME", 0.1 * cashArr[2]], ["QUARTER", 0.25 * cashArr[3]], ["ONE", cashArr[4]], ["FIVE", 5 * cashArr[5]], ["TEN", 10 * cashArr[6]], ["TWENTY", 20 * cashArr[7]], ["HUNDRED", 100 * cashArr[8]]]);

  console.log(res)

  if(res.status === "INSUFFICIENT_FUNDS")
    document.querySelector('.registerResult').textContent = document.querySelector('.registerResult').textContent + " " +res.status + " Payment can't be accepted. Sorry!";
  else if(res.status === "CLOSED"){
    document.querySelector('.registerResult').textContent = "Store is closed! Payment accepted.";
    cashDrawer[0].childNodes.forEach( pocket => pocket.type === 'number' ? pocket.value = 0 : '0' );
    document.querySelector('#registerInp1').value = 0;
    document.querySelector('#registerInp2').value = 0;
  }
  else{
    document.querySelector('.registerResult').textContent = "Store is open! Payment accepted.";
    console.log(res.change)
    res.change.forEach(arr => {
      document.querySelector(`#${arr[0]}`).value = parseInt(document.querySelector(`#${arr[0]}`).value) - arr[1] / valArr[`${arr[0]}`]
    });
    document.querySelector('#registerInp1').value = 0;
    document.querySelector('#registerInp2').value = 0;
  }
 
}


document.querySelector('#registerBtn').addEventListener('click', main);