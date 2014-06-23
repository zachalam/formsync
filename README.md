formsync.js 1.0
-----------------------------
formsync.js is a ultra lightweight jQuery add-on that allows developers to asynchronously submit forms without understanding or writing a single line of javascript.

Installation
-----------------------------
Add jQuery then formsync to any HTML document.

```javascript
<script src="//code.jquery.com/jquery-latest.min.js"></script>
<script src="/js/formsync/formsync.js"></script>
```

Building the Form: Frontend
-----------------------------
If you've written a HTML form in the past then there isn't anything new. Simply build your form as usual and add the "formsync" class to the **form** tag. For message reporting: add two div layers inside the "form". One with a class of "error" the other "success". These should be styled by you. 

```HTML
<form class="formsync" method="GET" action="submit.php">
<div class="error" style="display:none;"></div>
<div class="success" style="display:none;"></div>

<input type="text" name="hello">
<input type="submit" value="Submit Form">
</form>
```

That's all. You're ready to go!



Receiving Data: Backend
-----------------------------
Data from the form is sent to your server normally. No extra work is needed.

Assume we have an input called "first_name" sent using the GET method.
```HTML
<input type="text" name="first_name" value="">
```

The data contained in this input can then be accessed using your frameworks GET accessor.
```PHP
<?php 

$first_name = $_GET["first_name"];

?>
```


Sending Response: Backend
-----------------------------
The URL specified in the form action must always send back a JSON response. For simplicity formsync.js expects only one variable called "error" to be returned. In the case of a success "error" should be set to 0, NULL, or false.

Most frameworks have built in support for JSON, here is a sample case for "submit.php".
```php
<?php

// an error occured. 
echo json_encode(array("error"=>"Invalid Email Address"));

?>
```

```php
<?php

// the form data was okay.
echo json_encode(array("error"=>false));

?>
```

formsync.js will automatically inject this error message into your error div. See "Success Actions" to learn how successful events are handled.


Form Attributes
-----------------------------
**formsync_method**:
Overrides the method (if any) specified in the form.
```HTML
<input type="hidden" name="formsync_method" value="http://example.com">
```

**formsync_action**:
Overrides the action (if any) specified in the form.
```HTML
<input type="hidden" name="formsync_action" value="http://example.com">
```


Success Actions 
-----------------------------
**formsync_redirect**:
Redirect user to http://example.com if server returns no error on form submission.
```HTML
<input type="hidden" name="formsync_redirect" value="http://example.com">
```

**formsync_message**:
Inject message into "success" div if server returns no error on form submission.
```HTML
<input type="hidden" name="formsync_message" value="Form was submitted successfully.">
```

**formsync_alert**:
Uses the javascript alert function to display a message
```HTML
<input type="hidden" name="formsync_alert" value="Thanks for your feedback.">
```

**formsync_callback**:
The name of a user written function to call after success
```HTML
<input type="hidden" name="formsync_callback" value="myFunctionName">
```

**formsync_clear**:
Clear all input fields of data on success
```HTML
<input type="hidden" name="formsync_clear" value="true">
```

**formsync_hide**:
Hides entire form including everything between "form" tags.
```HTML
<input type="hidden" name="formsync_hide" value="true">
```


Notices
----------------------------
"formsync" is a restricted keyword.
Do not use the text "formsync" to define variables or inputs outside the ones listed here.
Doing so may unintentionally cause loss of data.
