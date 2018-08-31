const saveLimit = document.getElementById('saveLimit');
const resetTotal = document.getElementById('resetTotal');
const limit = document.getElementById('limit');

chrome.storage.sync.get(['limit'], function(budget) {
  limit.value = budget.limit;
});

saveLimit.onclick = function() {
  const limit = document.getElementById('limit').value;
  if(limit){
    chrome.storage.sync.set({'limit': limit}, function () {
      close();
    });
  }
};

resetTotal.onclick = function() {
  chrome.storage.sync.set({'total': 0}, function () {
    const notifOptions = {
      iconUrl: 'images/icon48.png',
      message: 'Total has been reset to 0',
      title: 'Total reset',
      type: 'basic',
    };
    chrome.notifications.create('totalReset', notifOptions);
  });
};
