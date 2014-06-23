$(document).ready(function() {

	/**
	- Script: formsync.js
	- Description: Allows the asynchronous submission of forms. Without
	  requiring the end developer to understand or use javascript.
	- Author: Zach Alam
	- Website: www.zachalam.com
	- Last Update: 2 June 2014
	*/

	////////////////////////////////////////////////////////

	// enable/disable debug mode.
	// this shows specific errors when server does not accept data
	var DEBUG_MODE_ENABLED = true;
	
	// language variables
	// shown when the submit button is pressed
	var LANG_PLEASE_WAIT = "Please wait...";
	// generic error, shown when debug mode is false, and server error occurs.
	var LANG_UNABLE_TO_COMM = "Unable to communicate with server.";
	// generic error, shown when user has not set a form action
	var LANG_NO_FORM_ACTION = "Formsync.js Error: No <form> action set.";
	
	// error selector, used to inject server responses 
	// <div class="error"></div>
	var ERROR_SELECTOR = ".error";
	// <div class="success"></div>	
	var SUCCESS_SELECTOR = ".success";
	
	////////////////////////////////////////////////////////
	
	$(".formsync").submit(function(event) {
	
		// Generally, browsers navigate to the "action"
		// specified in the attribute of a HTML <form> tag.
		// by specifying the .preventDefault() method
		// we can prevent this action from happening.
		event.preventDefault();
		
		// hide open error or success div if shown
		$(ERROR_SELECTOR, this).slideUp();
		$(SUCCESS_SELECTOR, this).slideUp();
		
		// assign global (window) variable to this form
		// we'll call it "formsync" so other functions can use it.
		window.formsync = this;

		// serialize formdata with all inputs
		// except anything that starts with "formsync_"
		var form_data = $(":not(input[name='formsync_action'])",this).serialize();

		// if debug mode is enabled, log form data
		if(DEBUG_MODE_ENABLED) console.log($(this).serialize());

		
		// disallow user from making changes to any part of the 
		// form after they have pressed the submit button.
		$(':input',this).prop("disabled",true);
		
		// save the current text value of the submit button
		window.submit_button = $('input[type="submit"]',this).attr("value");
		
		// set the default text of the submit button to "please wait".
		$('input[type="submit"]',this).attr("value",LANG_PLEASE_WAIT);
		
		// -----------------------------------------------------------
		
		// obtain whether this is a GET or POST
		var method_override = formsync_get_attribute("method");
		if(method_override) method = method_override;
		else method = $(this).attr("method");
		// if no method is set, use GET
		if(!method) method = "GET";
		
		// obtain the action of this form, ie: submit.php
		var action_override = formsync_get_attribute("action");
		if(action_override) action = action_override;
		else action = $(this).attr("action");
		if(!action) alert(LANG_NO_FORM_ACTION);
		
		// -----------------------------------------------------------
	


		// set timeout of 400ms, for better visual appearance.
		// this prevents the server from responding too quickly, causing 
		// the input fields from flashing.
		setTimeout(function() {	

			// send request with data to server
			$.ajax({
				type: method,
				url: action,
				data: form_data,
				success: formsync_success,
				error: formsync_error,
				complete: formsync_complete,
				dataType: 'json'
			});
		
		}, 400);
		
	});
	
	////////////////////////////////////////////////////////
	
	function formsync_get_attribute(name)
	{
		// retrieves hidden input field value from "thisform"
		// <input type="hidden" name="formsync_method" value="POST">
		// ie: formsync_method
		
		var attribute = $('input[name="formsync_'+name+'"]',window.formsync).attr("value");
		return attribute;	
	}
	
	function formsync_set_error(error_text)
	{
		// sets <div class="error"> to the error text
		// then displays it to the end user.
		
		$(ERROR_SELECTOR,window.formsync).html(error_text);
		$(ERROR_SELECTOR,window.formsync).slideDown();	
	}
	
	////////////////////////////////////////////////////////
	
	function formsync_success(data)
	{
		// the server did not encouter a problem handling this request

		// if debug mode is enabled, log data in console
		if(DEBUG_MODE_ENABLED)  console.log(data);


		if(data.error)
		{
			// server did not accept data
			formsync_set_error(data.error);
			
		}
		else
		{
			// server accepted data, read formsync inputs
			// to find out what happens next
			if(formsync_get_attribute("redirect"))
			{
				// redirect browser
				window.location.href = formsync_get_attribute("redirect");
			}

			// ----------
			
			if(formsync_get_attribute("clear"))
			{
				// reset form
				$(window.formsync)[0].reset();

			}						
			
			// ----------
			
			if(formsync_get_attribute("hide"))
			{
				// hides form by sliding it up
				$(this).slideUp();
			}

			// ----------
			
			if(formsync_get_attribute("show"))
			{
				// shows a specific selector by sliding it down
				$(formsync_get_attribute("show")).slideDown();
			}

			// ----------

			if(formsync_get_attribute("alert"))
			{
				// sets a message using the alert() function.
				alert(formsync_get_attribute("alert"));

			}

			// ----------
		
			if(formsync_get_attribute("callback"))
			{
				// runs a user defined function
				var call_callback = window[formsync_get_attribute("callback")];
				call_callback();

			}

			// ----------

		}
	}
	
	function formsync_error(data)
	{
		// the server encountered a problem handling this request
		
		if(DEBUG_MODE_ENABLED)
		{
			// an error occurred talking to the server.
			// post an alert to the user
			alert(data.status + ", " + data.statusText);
			
			// inject response error into error div
			formsync_set_error(data.responseText);
		}
		else
		{
			// show generic error
			formsync_set_error(LANG_UNABLE_TO_COMM);
		}
	}
	
	function formsync_complete()
	{
		// function to complete after ajax request
		// regardless of whether the form was successfull submitted


	
		// change submit button text back to original
		$("input[type='submit']",window.formsync).attr("value",window.submit_button);
		
		// enable all inputs
		$(':input',window.formsync).prop("disabled",false);


				
	}
	
	
});
