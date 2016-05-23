#flyselect
Simple Lightweight JS plugin to make any HTML drop-down searchable (NO JQuery or any other dependencies)



### Simple usage:

Reference the two files (JS and CSS) this way:


Call via self-executing function:

>Assuming SelCountry is the name of your HTML select


    (function () {var i = new flyselect().init('SelCountry');})();

OR 

explicitly on page load:


    window.onload = function(){
        var i = new flyselect().init('SelCountry');
    }
    
| Note |
| ------|
| Check sample.html file |


