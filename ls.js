<!-- Start of Lead Source Tracking Code -->
<script>
var LeadSourceCookieModule = function(){

	var cookieName = 'leadSource',
		latestCookieName = 'latestLeadSource',
		formCheckInterval,
		formCheckCount = 0;

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

	function checkLeadSource() {
		var i = readCookie(cookieName);
	    if (i != "" && i != null) {
	    	console.log('latest cookie value is: "' + i + '"');
	    	setLatestLeadSource(2000);
	    	formCheckStart();
	    } else {
	    	setLatestLeadSource(2000);
	    	setLeadSource(2000);
	    	formCheckStart();
	    }
	}

	function setLeadSource(days) {

	var d = new Date();
    	d.setTime( d.getTime() + (days * 24 * 60 * 60 * 1000) );
    	var expires = "expires="+ d.toUTCString();

    	var cookieValue = getLeadSource();
    	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/;domain=act-on.com;";
    	// console.log('cookie set: "' + cookieValue + '"');
	}

	function setLatestLeadSource(days) {

	var d = new Date();
    	d.setTime( d.getTime() + (days * 24 * 60 * 60 * 1000) );
    	var expires = "expires="+ d.toUTCString();

    	var cookieValue = getLeadSource();
    	document.cookie = latestCookieName + "=" + cookieValue + ";" + expires + ";path=/;domain=act-on.com;";
    	// console.log('cookie set: "' + cookieValue + '"');
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
		} else if ((document.referrer.indexOf('google') + document.referrer.indexOf('bing')) > -2) {
		    ls = 'Organic Search';
		} else if (document.referrer != '') {
		    ls = 'Inbound Link';
		} else {
		    ls = 'Marketing Unknown';
		}

		return ls;
	}

	function formCheck() {
		// console.log('checking for form');
		formCheckCount++;
		if ($('form.ao-form input[name="Lead Source"]').length) {
			$('form.ao-form input[name="Lead Source"]').val(readCookie(cookieName));
			$('form.ao-form input[name="Latest Lead Source"]').val(readCookie(latestCookieName));
			// console.log('form value set');
			formCheckStop();
		} else if (formCheckCount > 10){
			formCheckStop();
		} else {
			// console.log('no form found');
		}
	}

	function formCheckStart() {
		// console.log('form check starting');
		formCheckInterval = setInterval(formCheck,1200);	
	}

	function formCheckStop() {
		clearInterval(formCheckInterval);
		// console.log('form check ending');
	}

	function init() {
		checkLeadSource();
	}

	return {
		init: init
	};
}();

LeadSourceCookieModule.init();

</script>
<!-- End of Lead Source Tracking Code -->