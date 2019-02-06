
function getRoman(num) {
    var objRoman = {
        1 : 'I',
        5 : 'V',
        10 : 'X',
        50 : 'L',
        100 : 'C',
        500 : 'D',
        1000 : 'M'
        }
    //var romanValue = ['I','V','X','L','C','D','M'];
    var arrRoman = [];

    if(num > 1000 && num <= 3000){
      while(arrRoman.length !== num/1000)
        arrRoman.push(objRoman[1000])
      return arrRoman;
    }

    var arrKeys = Object.keys(objRoman);
    arrKeys = arrKeys.map(ele => parseInt(ele));

    var lastKeyI = arrKeys.findIndex(val => val >= num );

    if(lastKeyI<0)
      lastKeyI = (arrKeys.length) - 1;



    if(arrKeys[lastKeyI]=== num){
      arrRoman.push(objRoman[arrKeys[lastKeyI]]);
      return arrRoman;
    }

    if(arrKeys[lastKeyI] - arrKeys[lastKeyI - 2] === num){
        arrRoman.push(objRoman[arrKeys[lastKeyI - 2]]);
        arrRoman.push(objRoman[arrKeys[lastKeyI]]);
        return arrRoman;
    }

    if(arrKeys[lastKeyI] - arrKeys[lastKeyI - 1] === num){
        arrRoman.push(objRoman[arrKeys[lastKeyI - 1]]);
        arrRoman.push(objRoman[arrKeys[lastKeyI]]);
        return arrRoman;
    }

    var valI = lastKeyI-1;
    var valRoman= 0;
    while(valRoman !== num && valI >= 0 ){
        if(valRoman + arrKeys[valI] <= num){
            arrRoman.push(objRoman[arrKeys[valI]]);
            valRoman = valRoman+arrKeys[valI];
        }else{
            valI= valI - 1;
        }
    }

 return arrRoman;
}

function convertToRoman(num){
  let eachNum = num.toString().split('');

  let numLen = eachNum.length - 1;

  eachNum = eachNum.map(ele => {
    let eleN = parseInt(ele) * Math.pow(10,numLen);
    numLen = numLen - 1;
    return eleN;
  });
  var output = [];
  eachNum.forEach(ele => {
    output = output.concat(getRoman(ele));
  });
  return output.join('')
}

function main(){
  let inp = document.querySelector('#romanInput').value;
  inp = parseInt(inp);
  document.querySelector('#romanInput').value = '';
  if(inp > 3999)
   inp= 'a';
  document.querySelector('.romanResult').textContent = convertToRoman(inp) ? convertToRoman(inp) : 'INVALID INPUT!';

}


document.querySelector('#romanBtn').addEventListener('click', main);
