chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type) {
      case "create":
        chrome.bookmarks.create({
          'title': request.url,
          'url': request.url
        }, function(result) {
          sendResponse({status: "ok", bookmarked: true});       
        });
        
        break;

      case "get":
        chrome.bookmarks.search(request.url, function(results){
          let bookmarked = (results.length > 0) ? true : false;
          sendResponse({status: "ok", bookmarked: bookmarked});
        })
        break;
      
      case "remove":
        chrome.bookmarks.search(request.url, function(results){
          for (let res of results) {
            chrome.bookmarks.remove(res.id);
          }
          sendResponse({status: "ok", bookmarked: false});
        })
        break;
    }
    return true;
  }
);
