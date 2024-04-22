/********************************************

UTM LOGGER

NOTES:
	-	JS session closes when tab/browser is closed.
	-	JS localstorage can be used for semi premanent storage

code example:
	
	var searchParams = new URLSearchParams(window.location.search); //store as var
	searchParams.has('sent'); //true/false

UTM Parameter example:

	https://website.com?utm_source=test&utm_medium=test&utm_campaign=test&utm_term=test&utm_content=test

UTM parameters supported:
	utm_source
	utm_medium
	utm_campaign
	utm_term
	utm_content
	utm_state - EXPERIMENTAL
	
********************************************/
	console.log("===== UTM tracking initialized =====");

	/* =============================== */
	/* ===== Define DOM Variables  ===== */
	/* =============================== */
		var inputUtmSource = document.querySelector('input[name="utm_source"]');
		var inputUtmMedium = document.querySelector('input[name="utm_medium"]');
		var inputUtmCampaign = document.querySelector('input[name="utm_campaign"]');
		var inputUtmTerm = document.querySelector('input[name="utm_term"]');
		var inputUtmContent = document.querySelector('input[name="utm_content"]');
		var inputUtmState = document.querySelector('input[name="utm_state"]');

		var inputMtmSource = document.querySelector('input[name="mtm_source"]');
		var inputMtmMedium = document.querySelector('input[name="mtm_medium"]');
		var inputMtmCampaign = document.querySelector('input[name="mtm_campaign"]');
		var inputMtmContent = document.querySelector('input[name="mtm_content"]');
		var inputMtmKwd = document.querySelector('input[name="mtm_kwd"]');
		var inputMtmCid = document.querySelector('input[name="mtm_cid"]');
		var inputMtmGroup = document.querySelector('input[name="mtm_group"]');
		var inputMtmPlacement = document.querySelector('input[name="mtm_placement"]');
		
		var inputMtmState = document.querySelector('input[name="mtm_state"]');
		
		/* ===== UTM Tester vars  ===== */
		//var UtmTester = document.querySelector(".UTMTesterTool");
		var testerUtmSource = document.querySelector(".UTMTesterTool [data-utm='mtm_source']");
		var testerUtmMedium = document.querySelector(".UTMTesterTool [data-utm='mtm_medium']");
		var testerUtmCampaign = document.querySelector(".UTMTesterTool [data-utm='mtm_campaign']");
		var testerUtmTerm = document.querySelector(".UTMTesterTool [data-utm='mtm_term']");
		var testerUtmContent = document.querySelector(".UTMTesterTool [data-utm='mtm_content']");
		var testerUtmState = document.querySelector(".UTMTesterTool [data-utm='mtm_state']");

		/* ===== MTM Tester vars  ===== */
		//var MtmTester = document.querySelector(".UTMTesterTool");
		var testerMtmSource = document.querySelector(".UTMTesterTool [data-utm='mtm_source']");
		var testerMtmMedium = document.querySelector(".UTMTesterTool [data-utm='mtm_medium']");
		var testerMtmCampaign = document.querySelector(".UTMTesterTool [data-utm='mtm_campaign']");
		var testerMtmContent = document.querySelector(".UTMTesterTool [data-utm='mtm_content']");
		var testerMtmKwd = document.querySelector(".UTMTesterTool [data-utm='mtm_kwd']");
		var testerMtmCid = document.querySelector(".UTMTesterTool [data-utm='mtm_cid']");
		var testerMtmGroup = document.querySelector(".UTMTesterTool [data-utm='mtm_group']");
		var testerMtmPlacement = document.querySelector(".UTMTesterTool [data-utm='mtm_placement']");
		

	/* ============================= */
	/* ===== Primary Functions  ===== */
	/* ============================= */
		/***** Log UTM values *****/	
		function utm_logger(param) {
			var searchParams = new URLSearchParams(window.location.search); 
			var paramValue = "";
			var utm_state = "";

			if(searchParams.has(param)) {
				//if UTM parameters are present in URL
				//console.log("===== UTM values detected - in URL =====");
				utm_state = "url";
				paramValue = searchParams.get(param);
				sessionStorage.setItem(param, paramValue);
				localStorage.setItem(param, paramValue);

			}else if(sessionStorage.getItem(param)){
				//if UTM parameters are not present in URL, but are in SessionStorage
				//console.log("===== UTM values detected - in short-term session =====");
				utm_state = "sessionStorage";
				paramValue = sessionStorage.getItem(param);

			}else if(localStorage.getItem(param)){
				//if UTM parameters are not present in URL or SessionStorage, but are in LocalStorage
				//console.log("===== UTM values detected - in long-term session =====");
				utm_state = "localStorage";
				paramValue = localStorage.getItem(param);

			}
			console.log("UTM detected: "+param+": "+paramValue+", utm_state: "+utm_state);
			//return paramValue;
			return {paramValue, utm_state};

		};

		/***** Fill in UTM values in form *****/
		function utm_form_fill() {
			//console.log("form fill run");
			inputUtmSource.value = utm_source.paramValue;
			inputUtmMedium.value = utm_medium.paramValue;
			inputUtmCampaign.value = utm_campaign.paramValue;
			inputUtmTerm.value = utm_term.paramValue;
			inputUtmContent.value = utm_content.paramValue;
			inputUtmState.value = utm_source.utm_state;
			//console.log("UTM form inputs filled");
		};
		function mtm_form_fill() {
			//console.log("form fill run");
			inputMtmSource.value = mtm_source.paramValue;
			inputMtmMedium.value = mtm_medium.paramValue;
			inputMtmCampaign.value = mtm_campaign.paramValue;
			inputMtmContent.value = mtm_content.paramValue;
			inputMtmKwd.value = mtm_kwd.paramValue;
			inputMtmCid.value = mtm_cid.paramValue;
			inputMtmGroup.value = mtm_group.paramValue;
			inputMtmPlacement.value = mtm_placement.paramValue;
			
			inputMtmState.value = mtm_source.utm_state;
			//console.log("UTM form inputs filled");
		};

		/***** Fill in testing tool *****/
		function utm_test_fill() {
			console.log('utm_test_fill()');
			testerUtmSource.textContent = utm_source.paramValue;
	  		testerUtmMedium.textContent = utm_medium.paramValue;
	  		testerUtmCampaign.textContent = utm_campaign.paramValue;
	  		testerUtmTerm.textContent = utm_term.paramValue;
	  		testerUtmContent.textContent = utm_content.paramValue;
	  		testerUtmState.textContent = utm_state;
		};

		function mtm_test_fill() {
			console.log('mtm_test_fill()');
			testerMtmSource.textContent = mtm_source.paramValue;
	  		testerMtmMedium.textContent = mtm_medium.paramValue;
	  		testerMtmCampaign.textContent = mtm_campaign.paramValue;
	  		testerMtmContent.textContent = mtm_content.paramValue;
	  		testerMtmKwd.textContent = mtm_kwd.paramValue;

	  		testerMtmCid.textContent = mtm_cid.paramValue;
	  		testerMtmGroup.textContent = mtm_group.paramValue;
	  		testerMtmPlacement.textContent = mtm_placement.paramValue;
		};

	/* ======================== */
	/* ===== Run Functions ===== */
	/* ======================== */
		
		/***** Grab UTMs *****/
		var utm_source = utm_logger("utm_source");
		var utm_medium = utm_logger("utm_medium");
		var utm_campaign = utm_logger("utm_campaign");
		var utm_term = utm_logger("utm_term");
		var utm_content = utm_logger("utm_content");
		var utm_state = utm_source.utm_state;

		/***** Grab MTMs - alternate Matomo syntax *****/
		var mtm_source = utm_logger("mtm_source");
		var mtm_medium = utm_logger("mtm_medium");
		var mtm_campaign = utm_logger("mtm_campaign");
		var mtm_content = utm_logger("mtm_content");
		var mtm_kwd = utm_logger("mtm_kwd");
		var mtm_cid = utm_logger("mtm_cid");
		var mtm_group = utm_logger("mtm_group");
		var mtm_placement = utm_logger("mtm_placement");

		var mtm_state = mtm_source.utm_state;

		//check if element exists
		function elementExists(selector) {
		    return document.querySelector(selector) !== null;
		}

		/***** Fill form after X seconds *****/
		setTimeout(() => {

			if(elementExists('#UTMTester')){
				utm_test_fill();
			}
			if(elementExists('#MTMTester')){
				mtm_test_fill();
			}
			
			utm_form_fill();
			mtm_form_fill();
		  	//console.log("UTM form fill - delayed for 1000ms.");
						
		}, 1000);
		