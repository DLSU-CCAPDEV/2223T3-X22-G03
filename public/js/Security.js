$(document).ready(function () {

    function isFilled() {

        var user_securityCode = validator.trim($('#user_securityCode').val());

        var securityCodeEmpty = validator.isEmpty(user_securityCode);

        return ( !securityCodeEmpty );
    }

    async function validateField(field, fieldName, error) {

        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);
    
        if(empty) {
   
            field.prop('value', '');
            $('#error_box').css('display', 'block');
            error.text(fieldName + ' should not be empty.');
        }

        else{
            error.text('');
            $('#error_box').css('display', 'none');
        }
            
        var filled = isFilled();

        if( filled ) {
            $('#submit').prop('disabled', false);
            $('#submit').css('background', 'green');
            $('#submit').css('cursor', 'pointer');
        }
        else{
            $('#submit').prop('disabled', true);
            $('#submit').css('background', '#cccccc');
            $('#submit').css('cursor', 'not-allowed');
        }

    }

    $('#user_securityCode').keyup(function () {
        validateField($('#user_securityCode'), 'Security Code', $('#error_message'));
    });

});