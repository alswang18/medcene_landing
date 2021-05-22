/**
 * 
 * Dialog
 * 
 */

let dialog = {
    show: function(selector) {
        let _dialog = document.querySelector(selector);
        _dialog.classList.add('dialog-show');
    },
    closeDialog: function(i) {
         let _dialog = document.querySelectorAll('.dialog');
        _dialog[i].classList.remove('dialog-show');
    }
}

let elemDialog = document.querySelectorAll('.dialog .btn-tools');
elemDialog.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        dialog.closeDialog(index);
    })
})


/**
 * 
 *  HTTP Request
 * 
 */

let httpRequest = {
    get: async (_url) => {
        try {
            return await $.getJSON(_url);
        } catch (error) {
            return {
                success: false,
                message: error.responseText,
                payload: null 
            }
        }
    },
    post: async (_url, _data) => {
        let result = null;
        try {
            result = await $.ajax({
                url     : _url,
                type    : 'post',
                data    : _data,
                dataType: 'json'
            });
        } catch (error) {
            result = {
                success: false,
                message: error.responseText,
                payload: null 
            }
        }

        return result;
    },
    upload: async (_url, _data) => {
        let result = null;
        try {
            result = await $.ajax({
                url        : _url,
                type       : 'post',
                data       : _data,
                dataType   : 'json',
                enctype    : 'multipart/formdata',
                contentType: false,
                processData: false
            });
        } catch (error) {
            result = {
                success: false,
                message: error.responseText,
                payload: null 
            }
        }

        return result;
    }
}


/**
 * 
 * Dropdown
 * 
 */

let dTrigger = document.querySelectorAll('.dropdown-trigger');
dTrigger.forEach((elem, i) => {
    elem.addEventListener('click', function(){
        let _dropdown = document.querySelectorAll('.dropdowns .filter-dropdown');
        if(_dropdown[i] != undefined){
            if(_dropdown[i].classList.length > 1){
                _dropdown.forEach((el, ind) => {
                    el.classList.add('hide');
                })
                _dropdown[i].classList.remove('hide'); 
            }else{
                _dropdown[i].classList.add('hide'); 
            }
        }
    })
})

/**
 * 
 * Next Slide
 * 
 */

let curForm = 0;
let _steps = document.querySelectorAll('.steps');
let _links = document.querySelectorAll('.links');

const showContent = (n) => {
    _steps.forEach((elm, pos) => {
        if(n == pos) {
            elm.classList.remove('hide');
            elm.classList.add('show');
        } else {
            elm.classList.remove('show');
            elm.classList.add('hide');
        }
    })

    _links.forEach((e, i) => {
        if(n == i) {
            e.classList.add('active');
        }else{
            e.classList.remove('active');
        }
    })
}

let slide = {
    next: () => {
        curForm = curForm + 1;
        if(curForm < _steps.length){
            showContent(curForm);
        }
    },
    prev: () => {
        curForm = curForm - 1;
        if(curForm < _steps.length){
            showContent(curForm);
        }
    }
}

showContent(curForm);

/**
 * 
 * TextArea
 * 
 */

 let textAreaHeight = () => {
    let text = document.querySelectorAll('textarea');
    text.forEach((elem, index) => {
        addEventListener('input', function() {
            elem.style.height = "5px";
            elem.style.height = (elem.scrollHeight) + "px";
        })
    })
}

textAreaHeight();




