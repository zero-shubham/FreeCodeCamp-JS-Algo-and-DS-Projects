
  function rot13(str, flag) { // LBH QVQ VG!
    str = str.toUpperCase();
    

    if(flag === 1){
      var t = [];
    [...str].forEach(ele => {
      if(ele.charCodeAt(0) < 65 || ele.charCodeAt(0) > 90){
        t.push(ele);
      }
      else{
      var tmp = ele.charCodeAt(0) - 13;
      if(tmp<65){
        tmp = 65 - tmp;
        tmp = (90 - tmp) +1;
      }
      t.push(String.fromCharCode(tmp));
    }
    });
    /*while(t.indexOf('-')){
      t[t.indexOf('-')] = " ";
    }*/
    str = t.join('');
    }else{
      var t = [];

      [...str].forEach(ele => {
        if(ele.charCodeAt(0) < 65 || ele.charCodeAt(0) > 90){
          t.push(ele);
        }
        else{
        var tmp = ele.charCodeAt(0) + 13;
        if(tmp>90){
          tmp = tmp - 90;
          tmp = (65 + tmp) -1;
        }
        t.push(String.fromCharCode(tmp));
        console.log("ele=>",ele,"tmp=>",tmp)
      }
      });
      /*while(t.indexOf('-')){
        t[t.indexOf('-')] = " ";
        console.log("t>",t);
      }*/
      str = t.join('');
    }

    return str;
  }

// Change the inputs below to test
//console.log(rot13("SERR PBQR PNZC"));


function main(){
  let inp = document.querySelector('#cipherInput').value;
  document.querySelector('#cipherInput').value = '';
  let res;
  if(document.querySelector('#toCipher').checked)
    res = rot13(inp,0)
  else
    res = rot13(inp,1)
  
  document.querySelector('.ciphereResult').textContent = res;
}

document.querySelector('#cipherBtn').addEventListener('click',main);