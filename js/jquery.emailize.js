$(document).ready(function(){

	// This is where you enter domains you recognise.
	// You don't want to link it to a AJAX url because it is unnecessary overhead.
	// Just calculate the 100 (or x) amount of popular domains for emails and cache it in a JavaScript script to the variable `window.emaildomains`
	window.emaildomains = [
		"facebook.com",
		"google.com",
		"gmail.com",
		"hotmail.co.uk",
		"hotmail.com",
		"googlemail.com",
		"hotmail.de",
		"live.co.uk",
		"live.com",
		"github.com",
		"fb.com",
		"youtube.com"
	];

	// Now this is where I go in vanilla and hardcore. You might not understand it, heck, I might not either.
	$.fn.emailize = function(){
		
		// No email domains. This is not good.
		if(typeof window.emaildomains == 'undefined') {
			console.log('window.emaildomains needs to contain an array of email domains for jquery.emailize.js');
			return false;
		}

		// Global string
		var _val, _index, _match, last_autocomplete = "", _domain, _subject = $(this), _focus = false;

		// Funk it up.
		$(this).addClass('emailize').attr('contenteditable', 'true');

		// Key pressing?
		$(this).on('keyup keydown', function(e) {
			_val = $(this).text();
			_index = _val.indexOf("@");

			// Clear autocomplete but leave tag there.
			if(_subject.find('span.autocomplete').length > 0) {
				last_autocomplete = _subject.find('span.autocomplete').text();
				_subject.find('span.autocomplete').remove();
			}

			// Ignore enter button.
			if(e.keyCode == 13) {
				return;
			}

			if(_index <= 1) {
				return;
			}

			_match = _val.substr((_index + 1), (_val.length - _index - 1));
			if(_match.length == 0) {
				return;
			}

			if(_match.indexOf(".") > 0) {
				return;
			}

			for(var domain in window.emaildomains) {
				_domain = window.emaildomains[domain];

				if(_domain.substr(0, _match.length) == _match) {
					_match = _domain.substr((_match.length), (_domain.length - _match.length));
					$('<span>').addClass('autocomplete').text(_match).appendTo(_subject);
					return;
				}
			}
		});

		// Focus & blur
		$(this).focus(function(){ _focus = true; });
		$(this).blur(function(){ _focus = false; });

		// On enter, let's autocomplete.
		$(document).keypress(function(e) {
			if(_focus == true && e.keyCode == 13) {
				e.preventDefault();

				if(last_autocomplete.length > 0) {
					// Append text to subject and destroy autocomplete in DOM.
					_subject.append(last_autocomplete).find('span.autocomplete').remove();

					// Empty last autocomplete
					last_autocomplete = "";

					// Point cursor to end of field
					var range, selection;
					_val = _subject.text();
					range = document.createRange();
					range.selectNodeContents(_subject[0]);
					range.collapse(false);

					selection = window.getSelection();
					selection.removeAllRanges();
					selection.addRange(range);
				}
			}
		});

		// No WYSIWYG pasting. I don't like it.
		_subject.on('paste', function(e) {
			e.preventDefault();
			var pasted = e.originalEvent.clipboardData.getData('Text');
			document.execCommand('insertHTML', false, pasted)
		});

		// This is awesome.
	};

});