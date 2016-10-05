#flyselect
Simple, lightweight JS plugin to render any HTML select(drop down) into stylized, searchable element (NO JQuery or any other dependencies).



### Simple usage:

Reference the two files (CSS and JS):

-flyselect.min.css

-flyselect.min.js

Call via self-executing function:

>Assuming SelCountry is the name of your HTML select


    (function () {var i = new flyselect().init('SelCountry');})();

OR 

explicitly on page load:


    window.onload = function(){
        var i = new flyselect().init('SelCountry');
        //repeat the same to use for a new HTML select
    }
    
| Note |
| ------|
| Check sample.html file |


