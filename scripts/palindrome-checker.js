function palindrome(str) {
  str = str.toLowerCase();

  while(str.split(/[(\s)*(,.;_*#-/+)*]/).length != 1){/**while there are spaces and puntuations in the string, replace those with nothing i.e. remove them */
    str = str.replace(/[(\s)*(,.;_*#-/+)*]/,'');
  } 
  

  return (str.split('').reverse().join('') === str) /* splits the string into array just so that reverse() can be used, then joins it back as a string then compares it*/
}

function mainFunc(){
  let inp = document.querySelector('#palindromeInput').value;

  document.querySelector('#palindromeInput').value = '';
  let res = palindrome(inp);

  document.querySelector('.palindromeResult').textContent = res ? 'This is a palindrome string!' : 'This is not a palindrome string!';
}

document.querySelector('#palindromeBtn').addEventListener('click',mainFunc);