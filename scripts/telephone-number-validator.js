function telephoneCheck(str) {
  // Good luck!
   if(/^[1]*(\s)*([0-9]{3}|\([0-9]{3}\))(\s)*(-)*[0-9]{3}(\s)*(-)*[0-9]{4}/.test(str) && !/^(\([0 2-9]{3}\)[0-9]{8}|[0 2-9]{11})/.test(str))
    return true;
  else
    return false;
}

function main(){
  let inp = document.querySelector('#telephoneInput').value;

  document.querySelector('#telephoneInput').value =  '';

  document.querySelector('.telephoneResult').textContent = telephoneCheck(inp) ? 'Valid!' : 'Invalid!';
}

document.querySelector('#telephoneBtn').addEventListener('click', main);