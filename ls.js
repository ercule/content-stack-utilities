var LeadSourceModule = function(){

  var lsCookieName = '_lead_source', 
      mrCookieName = '_recent_lead_source',
      referrerCookieName = '_initial_referrer',
      lpCookieName = '_initial_landing_page',
      domainName = 'domain.com',
      cookieDuration = 2000;
  
  //⭐️ Be sure to set domainName to your actual domain name instead of 'domain.com'.

  function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }

  function checkCookie() {
    var i = readCookie(lsCookieName),
      j = readCookie(referrerCookieName),
      k = readCookie(lpCookieName);

    if ((i != "" && i != null) || (j != "" && j != null) || (k != "" && k != null)) {
      setCookie(cookieDuration, mrCookieName, getLeadSource());
    } else {
      setCookie(cookieDuration, mrCookieName, getLeadSource());
      setCookie(cookieDuration, lsCookieName, getLeadSource());
      setCookie(cookieDuration, referrerCookieName, getReferrer());
      setCookie(cookieDuration, lpCookieName, getURL());
    }
  }

  function setCookie(days, cName, cValue) {
    var d = new Date();
      d.setTime( d.getTime() + (days * 24 * 60 * 60 * 1000) );
      var expires = "expires="+ d.toUTCString();

      document.cookie = cName + "=" + cValue + ";" + expires + ";path=/;domain=" + domainName;
      console.log(cName + ' cookie set: "' + cValue + '"');
  }

  function getReferrer() {
    var referrer = document.referrer ? document.referrer : "(Direct)";
    return referrer;
  }
  
  function getURL() {
    var url = window.location.href;
    return url;
  }

  function getLeadSource() {
    var ls,
      params = {},
      search = location.search.substring(1);

    if ( search != '' ) {
      params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    }

    if (params.hasOwnProperty('utm_medium')) {
        if (params['utm_medium'] == 'org_social') { ls = 'Organic Social'; }
        else if (params['utm_medium'] == 'paid_social') { ls = 'Paid Social'; }
        else if (params['utm_medium'] == 'display') { ls = 'Display'; }
        else if (params['utm_medium'] == 'paid_search') { ls = 'Paid Search'; }
        else { ls = params['utm_medium']; }
    } else if ((document.referrer.indexOf('google') + document.referrer.indexOf('bing') + document.referrer.indexOf('duckduck')) > -3) {
        ls = 'Organic Search';
    } else if ((document.referrer.indexOf('twitter') + document.referrer.indexOf('linkedin') + document.referrer.indexOf('facebook')) > -3) {
        ls = 'Organic Social';
    } else if (document.referrer != '') {
        ls = 'Inbound Link';
    } else {
        ls = 'Marketing Unknown';
    }

    return ls;
  }

  function init() {
    checkCookie();
  }

  return {
    init: init,
    readCookie: readCookie
  };
}();

LeadSourceModule.init();

// ⭐️ Example tracking code follows for form population. This assumes you have a field in your forms that will accept the data copied from the cookie.

// var cookiedLS = LeadSourceModule.readCookie('_lead_source');
// var ls_fieldname = "input[name='leadsource']"

// function formPopulate(cookiedLS) {
//   if (document.querySelector(ls_fieldname)) {
//     document.querySelector(ls_fieldname).value = cookiedLS;
//   }
// }
   
// formPopulate(cookiedLS);

// window.addEventListener('DOMContentLoaded', function(){
//   formPopulate(cookiedLS);
// });

// Hubspot

// window.addEventListener("message", function(event) {
// if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
//   formPopulate(cookiedLS);
// }
// });
