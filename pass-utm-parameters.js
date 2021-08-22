//originally from https://www.analyticsmania.com/post/transfer-utm-parameters-google-tag-manager/, with a few changes

(function() {
  var domainsToDecorate = [
          'typeform.com'
      ],
      queryParams = [
          'utm_medium', //add or remove query parameters you want to transfer
          'utm_source',
          'utm_campaign',
          'something_else'
      ]
  // do not edit anything below this line
  var links = document.querySelectorAll('a'); 

// check if links contain domain from the domainsToDecorate array and then decorates
  for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
      for (var domainIndex = 0; domainIndex < domainsToDecorate.length; domainIndex++) { 
          if (links[linkIndex].href.indexOf(domainsToDecorate[domainIndex]) > -1 && links[linkIndex].href.indexOf("#") === -1) {
              links[linkIndex].href = decorateUrl(links[linkIndex].href);
          }
      }
  }
// decorates the URL with query params
  function decorateUrl(urlToDecorate) {
      urlToDecorate = (urlToDecorate.indexOf('?') === -1) ? urlToDecorate + '?' : urlToDecorate + '&';
      var collectedQueryParams = [];
      for (var queryIndex = 0; queryIndex < queryParams.length; queryIndex++) {
          if (getQueryParam(queryParams[queryIndex])) {
              collectedQueryParams.push(queryParams[queryIndex] + '=' + getQueryParam(queryParams[queryIndex]))
          }
      }
      return urlToDecorate + collectedQueryParams.join('&');
  }

  // borrowed from https://stackoverflow.com/questions/831030/
  // a function that retrieves the value of a query parameter
  function getQueryParam(name) {
      if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search))
          return decodeURIComponent(name[1]);
  }

})();
