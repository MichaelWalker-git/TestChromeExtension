const contextMenuItem = {
  "id": "spendMoney",
  "title": "SpendMoney",
  "contexts": ["selection"],
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value){
  return !isNaN(value) && parseInt(Number(value)) === value && !isNaN(parseInt(value, 10));
}


chrome.contextMenus.onClicked.addListener(function (clickData) {
  if(clickData.menuItemId === "spendMoney" && clickData.selectionText) {
    if(isInt(clickData.selectionText)){
      chrome.storage.sync.get(['total', 'limit'], function (budget) {
        let newTotal = 0;
        newTotal += budget.total ? parseInt(budget.total) : 0;
        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({'total': newTotal}, function () {
          if(newTotal >= budget.limit){
            const notifOptions = {
              iconUrl: 'images/icon48.png',
              message: 'Uh oh! Looks like you have reached your limit!',
              title: 'Limit reached',
              type: 'basic',
            };
            chrome.notifications.create('limitNotif', notifOptions);
          }
        });
      });
    }
  }
});
