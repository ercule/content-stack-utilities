<script type="text/javascript">
  var debuggingEnabled = true; // Set to true to enable debugging, false to disable

  // Function to log messages only if debugging is enabled
  function debugLog(message) {
    if (debuggingEnabled) {
      console.log(message);
    }
  }

  // Function to search for ready Hubspot forms
  function searchForReadyForms() {
    debugLog("Searching for ready Hubspot forms...");
    var forms = document.querySelectorAll('.hs-form');
    for (var i = 0; i < forms.length; i++) {
      var formId = forms[i].getAttribute('data-form-id');
      if (formId) {
        debugLog("Found form with ID: " + formId);
        triggerFormReadyEvent(formId);
        attachFormEngageListener(forms[i]);
      }
    }
    debugLog("Finished searching for ready Hubspot forms.");
  }

  // Function to set up a listener for the Hubspot form ready message
  function setupFormReadyListener() {
    debugLog("Setting up listener for Hubspot form ready message...");
    window.addEventListener("message", function(event) {
      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
        debugLog("Received onFormReady message for form ID: " + event.data.id);
        triggerFormReadyEvent(event.data.id);
        attachFormEngageListener(document.querySelector('.hs-form[data-form-id="' + event.data.id + '"]'));
      }
    });
    debugLog("Listener for Hubspot form ready message setup complete.");
  }

  // Function to trigger the Hubspot form ready event
  function triggerFormReadyEvent(formId) {
    debugLog("Triggering Hubspot form ready event for form ID: " + formId);
    window.dataLayer.push({
      'event': 'hubspot-form-ready',
      'hs-form-guid': formId
    });
    debugLog("Hubspot form ready event triggered for form ID: " + formId);
  }

  // Function to attach listeners for the form engage event
  function attachFormEngageListener(form) {
    debugLog("Attaching listeners for form engage event for form ID: " + form.getAttribute('data-form-id'));
    var elements = form.querySelectorAll('[class*="hs-"]');
    for (var i = 0; i < elements.length; i++) {
      elements[i].onclick = function() {
        var hsFormId = form.getAttribute('data-form-id');
        if (hsFormId) {
          debugLog("Form engage event triggered for form ID: " + hsFormId);
          window.dataLayer.push({
            'event': 'hubspot-form-engage',
            'hs-form-guid': hsFormId
          });
          debugLog("Hubspot form engage event pushed to dataLayer for form ID: " + hsFormId);
        }
      };
    }
    debugLog("Listeners attached for form engage event for form ID: " + form.getAttribute('data-form-id'));
  }

  // Function to set up a handler for the form submit message
  window.addEventListener("message", function(event) {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
      debugLog("Received onFormSubmitted message for form ID: " + event.data.id);
      window.dataLayer.push({
        'event': 'hubspot-form-success',
        'hs-form-guid': event.data.id
      });
      debugLog("Hubspot form success event pushed to dataLayer for form ID: " + event.data.id);
    }
  });

  // Initialize setup
  searchForReadyForms();
  setupFormReadyListener();
</script>
