const spendAmount = document.getElementById('spendAmount');
const totalElement = document.getElementById('total');

chrome.storage.sync.get('total', function(budget) {
  totalElement.textContent = budget.total;
});

spendAmount.onclick = function(element) {
  chrome.storage.sync.get('total', function(budget) {
    let newTotal = 0;
    if(budget.total){
      newTotal += parseInt(budget.total);
    }

    let amount = document.getElementById('amount').value;
    if(amount){
      newTotal += parseInt(amount);
    }

    chrome.storage.sync.set({'total': newTotal});
    totalElement.textContent = newTotal;
    document.getElementById('amount').value = '';
  })
};
