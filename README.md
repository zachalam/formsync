formsync.js 1.0
-----------------------------
Formsync is an ultra lightweight jQuery add on that allows a developer to asynchronously submit forms without understanding or writing javascript.

Installation
-----------------------------
Add jQuery then formsync.

```javascript
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/js/formsync/formsync.js"></script>
```

Building the Form, Frontend
-----------------------------
If you've written a HTML form in the past then there isn't anything new. Simply build your form as usual and add the "formsync" class to the <form> tag. For messages add two div layers inside the "form". One with a class of "error" the other "success". These should be styled by you. 

```HTML
<form class="formsync" method="GET" action="submit.php">
<div class="error" style="display:none;"></div>
<div class="success" style="display:none;"></div>

<input type="text" name="hello">
<input type="submit" value="Submit Form">
</form>
```

That's all you're ready to go!



Sending Responses, Backend
-----------------------------
The action URL should always send back a JSON response. For simplicity formsync.js expects one variable called "error" to be returned. In the case of a success "error" should be 0, NULL, or false.

Most frameworks have built in support for JSON, here is a sample case for "submit.php".
```php
<?php

echo json_encode(array("error"=>"Invalid Email Address"));

?>
```

formsync.js will automatically inject this error message into your error div.


Form Attributes
-----------------------------
formsync_method
Overrides the method (if any) specified in <form method="POST"> 
```
<input type="hidden" name="formsync_method" value="http://grade.net">
```

formsync_action
Overrides the action (if any) specified in <form action="submit.php">
```
<input type="hidden" name="formsync_action" value="http://grade.net">
```


Success Actions 
-----------------------------
formsync_redirect
Redirect user to http://grade.net if server returns no error on form submission.
```
<input type="hidden" name="formsync_redirect" value="http://grade.net">
```

formsync_message
Inject message into <div class="success"></div> if server returns no error on form submission.
```
<input type="hidden" name="formsync_message" value="The form was submitted successfully.">
```

formsync_alert
Uses the javascript alert function to display a message
```
<input type="hidden" name="formsync_alert" value="Thanks for your feedback.">
```

formsync_callback
The name of a user written function to call after success
```
<input type="hidden" name="formsync_callback" value="myFunctionName">
```

formsync_clear
Clear all input fields of data on success
```
<input type="hidden" name="formsync_message" value="true">
```

Notices
----------------------------
"formsync" is a restricted keyword.
Do not use the text "formsync" to define variables or inputs outside the ones listed here.
Doing so may unintentionally cause data loss.
