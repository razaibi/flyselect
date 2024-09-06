var flyselect = function () { };
flyselect.prototype = function () {
    var _f = function (id) {
        return document.getElementById(id);
    },
        _set_style = function (el, property, val) {
            if (_f(el) instanceof Array) {
                for (var i = 0; i <= el.length - 1; i++) {
                    el[i].style[property] = val
                };
            } else {
                _f(el).style[property] = val;
            }
        },
        _show = function (el) {
            _set_style(el, 'display', 'block');
        },
        _hide = function (el) {
            _set_style(el, 'display', 'none');
        },
        _filtered_val = [],
        _selectedText = '',
        _selectedValue = '',
        _set_item_by_value = function(el, selectedValue){
            _f(el).value = selectedValue;
            var childOptions = _f('flyselect_list_' + el).getElementsByTagName("*");
            for (var c = 0; c <= childOptions.length - 1; c++){
                if (childOptions[c].getAttribute('data-val') == selectedValue){
                    childOptions[c].click();
                }
            }
        },
        _render_select = function (el) {
            var sel = _f(el);
            var _seltexts = [];
            var _selvals = [];
            for (var p = 0; p <= sel.options.length - 1; p++) {
                _seltexts.push(sel.options[p].text);
                _selvals.push(sel.options[p].value);
            }
            _hide(el);
            var holderelem = document.createElement('DIV');
            holderelem.className = 'flyselect_holder';
            var filter_elem = document.createElement('INPUT');
            filter_elem.className = 'form_text';
            filter_elem.placeholder = "Select One";
            var list_elem = document.createElement('UL');
            list_elem.className = 'flyselect_list';
            list_elem.id = 'flyselect_list_' + el;
            for (var q = 0; q <= _selvals.length - 1; q++) {
                var option_elem = _build_option(_seltexts[q], _selvals[q]);
                list_elem.appendChild(option_elem);
                option_elem.addEventListener("click", function () {
                    filter_elem.value = this.innerHTML;
                    sel.value = this.getAttribute('data-val');
                    list_elem.style.display = 'none';
                    _selectedValue = sel.value;
                })
            }
            holderelem.appendChild(filter_elem);
            holderelem.appendChild(list_elem);
            list_elem.style.display = 'none';
            filter_elem.addEventListener("click", function () {
                //if (this.value.trim() == '') {
                var event = document.createEvent('HTMLEvents');
                event.initEvent('keyup', true, false);
                this.dispatchEvent(event);
                list_elem.style.display = 'block';
                //}
            })
            filter_elem.addEventListener("keyup", function () {
                list_elem.style.display = 'block';
                _filtered_val = [];
                var str_elems = '';
                var query = this.value;
                list_elem.innerHTML = '';
                if (query != '') {
                    for (var q = 0; q <= _seltexts.length - 1; q++) {
                        if (_seltexts[q].toUpperCase().includes(query.toUpperCase())
                            || _selvals[q].toUpperCase().includes(query.toUpperCase())
                        )
                        {
                            _filtered_val.push(q);
                        }
                    }
                    for (var m = 0; m <= _filtered_val.length - 1; m++) {
                        var option_elem = _build_option(_seltexts[parseInt(_filtered_val[m])], _selvals[parseInt(_filtered_val[m])]);
                        list_elem.appendChild(option_elem);
                        option_elem.addEventListener("click", function () {
                            filter_elem.value = this.innerHTML;
                            sel.value = this.getAttribute('data-val');
                            list_elem.style.display = 'none';
                            _selectedValue = sel.value;
                        })
                        list_elem.appendChild(option_elem);
                    }
                    if (_filtered_val.length == 0) {
                        list_elem.innerHTML = '<li class="flyselect_no_res">no results found... re-try search</li>';
                    }
                } else {
                    for (var q = 0; q <= _selvals.length - 1; q++) {
                        var option_elem = _build_option(_seltexts[q], _selvals[q]);
                        list_elem.appendChild(option_elem);
                        option_elem.addEventListener("click", function () {
                            filter_elem.value = this.innerHTML;
                            sel.value = this.getAttribute('data-val');
                            list_elem.style.display = 'none';
                            _selectedValue = sel.value;
                        })
                    }
                }
            })
            filter_elem.addEventListener("blur", function () {
                setTimeout(function(){
                    if (_selectedValue == '' || this.value == ''){
                        list_elem.style.display = 'none';
                        this.value = '';
                    }
                    var _picked_match = false;
                    for (var q = 0; q <= _seltexts.length - 1; q++){
                        if (_seltexts[q].toUpperCase() == filter_elem.value.toUpperCase()
                        || _selvals[q].toUpperCase() == filter_elem.value.toUpperCase()
                        ){
                            _picked_match = true;
                        }
                    }
                    if (!_picked_match){
                        list_elem.style.display = 'none';
                        filter_elem.value = '';
                    }
                }, 500);
            })
            sel.parentElement.appendChild(holderelem);
        },
        _build_option = function (text, val) {
            var option_elem = document.createElement('LI');
            option_elem.className = 'flyselect_item';
            option_elem.innerHTML = text;
            option_elem.setAttribute('data-val', val);
            return option_elem;
        },
        _init = function (el) {
            _render_select(el);
        };
    return {
        init: _init,
        setByValue: _set_item_by_value
    }
}();