# jquery.emailize.js

This is a library I built [as a UX suggestion in a blog post](http://bilaw.al/improving-email-address-input) I recently published. Writing emails is one of the most common tasks we do on the web and I think it should be increasingly be made simpler and quicker.

It is up to you whether you'd like to use it in production. I would <3 contributions.

# How to use
You need jQuery. After you need to include the `jquery.emailize.js` and `jquery.emailize.css` into your webpage.

To call emailize on a `<div>` element (or a generic `<email>` element as we have done in the example) run this before your `</body>` tag

```
$(document).ready(function(){
	$("email").emailize();
});
```

# Example
Click [here to view an example.](http://bih.github.io/jquery.emailize.js)