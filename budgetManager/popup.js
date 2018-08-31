const spendAmount = document.getElementById('spendAmount');
const totalElement = document.getElementById('total');
const limit = document.getElementById('limit');

chrome.storage.sync.get(['total', 'limit'], function(budget) {
  totalElement.textContent = budget.total;
  limit.textContent = budget.limit;
});

spendAmount.onclick = function(element) {
  chrome.storage.sync.get(['total', 'limit'], function(budget) {
    let newTotal = 0;
    if(budget.total){
      newTotal += parseInt(budget.total);
    }

    let amount = document.getElementById('amount').value;
    if(amount){
      newTotal += parseInt(amount);
    }

    chrome.storage.sync.set({'total': newTotal}, function() {
      if(amount && newTotal >= budget.limit){
        const notifOptions = {
          iconUrl: 'images/icon48.png',
          message: 'Uh oh! Looks like you have reached your limit!',
          title: 'Limit reached',
          type: 'basic',
        };
        chrome.notifications.create('limitNotif', notifOptions);
      }
    });
    totalElement.textContent = newTotal;
    document.getElementById('amount').value = '';
  });
};
