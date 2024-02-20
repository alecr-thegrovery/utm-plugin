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
	
********************************************/
	console.log("===== UTM tracking initialized =====");

	/* =========================== */
	/* ===== Define Variables  ===== */
	/* =========================== */
		var inputUtmSource = document.querySelector('input[name="utm_source"]');
		var inputUtmMedium = document.querySelector('input[name="utm_medium"]');
		var inputUtmCampaign = document.querySelector('input[name="utm_campaign"]');
		var inputUtmTerm = document.querySelector('input[name="utm_term"]');
		var inputUtmContent = document.querySelector('input[name="utm_content"]');
		var inputUtmState = document.querySelector('input[name="utm_state"]');
		/* ===== UTM Tester vars  ===== */
		var testerUtmSource = document.querySelector(".UTMTesterTool [data-utm='utm_source']");
		var testerUtmMedium = document.querySelector(".UTMTesterTool [data-utm='utm_medium']");
		var testerUtmCampaign = document.querySelector(".UTMTesterTool [data-utm='utm_campaign']");
		var testerUtmTerm = document.querySelector(".UTMTesterTool [data-utm='utm_term']");
		var testerUtmContent = document.querySelector(".UTMTesterTool [data-utm='utm_content']");
		var testerUtmState = document.querySelector(".UTMTesterTool [data-utm='utm_state']");
	/* =============================== */
	/* ===== Grab URL Parameters  ===== */
	/* =============================== */
		var searchParams = new URLSearchParams(window.location.search); 

	

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
			console.log("form fill run");
			//Long term cookie storage
			inputUtmSource.val(utm_source.paramValue);
			inputUtmMedium.val(utm_medium.paramValue);
			inputUtmCampaign.val(utm_campaign.paramValue);
			inputUtmTerm.val(utm_term.paramValue);
			inputUtmContent.val(utm_content.paramValue);
			inputUtmState.val(utm_campaign.utm_state);
			console.log("UTM form inputs filled");
		};

	/***** Run Functions *****/

		setTimeout(() => {
			var utm_source = utm_logger("utm_source");
			var utm_medium = utm_logger("utm_medium");
			var utm_campaign = utm_logger("utm_campaign");
			var utm_term = utm_logger("utm_term");
			var utm_content = utm_logger("utm_content");
			var utm_state = utm_source.utm_state;
			utm_form_fill();
		  	console.log("UTM form fill - delayed for 1000ms.");
		}, 1000);


		if(document.querySelector(".UTMTesterTool").length){
			console.log("===== UTM testing tool present =====");
			testerUtmSource.text(utm_source.paramValue);
			testerUtmMedium.text(utm_medium.paramValue);
			testerUtmCampaign.text(utm_campaign.paramValue);
			testerUtmTerm.text(utm_term.paramValue);
			testerUtmContent.text(utm_content.paramValue);
			testerUtmState.text(utm_state);
		}