$(document).ready(function () {

    function isFilledFirst() {

        var user_email = validator.trim($('#user_email').val());
        var user_securityCode = validator.trim($('#user_securityCode').val());

        var emailEmpty = validator.isEmpty(user_email);
        var securityCodeEmpty = validator.isEmpty(user_securityCode);

        return (!emailEmpty && !securityCodeEmpty );
    }

    function isFilledSecond() {

        var user_newPassword0 = validator.trim($('#user_newPassword0').val());
        var user_newPassword1 = validator.trim($('#user_newPassword1').val());

        var newPassword0Empty = validator.isEmpty(user_newPassword0);
        var newPassword1Empty = validator.isEmpty(user_newPassword1);

        return (!newPassword0Empty && !newPassword1Empty);
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
            
        var filledFirst = isFilledFirst();
        var filledSecond = isFilledSecond();

        if( filledFirst ) {
            $('#submit').prop('disabled', false);
            $('#submit').css('background', 'green');
            $('#submit').css('cursor', 'pointer');
        }
        else{
            $('#submit').prop('disabled', true);
            $('#submit').css('background', '#cccccc');
            $('#submit').css('cursor', 'not-allowed');
        }

        if ( filledSecond ) {
            $('#submit2').prop('disabled', false);
            $('#submit2').css('background', 'green');
            $('#submit2').css('cursor', 'pointer');
        }
        else{
            $('#submit2').prop('disabled', true);
            $('#submit2').css('background', '#cccccc');
            $('#submit2').css('cursor', 'not-allowed');
        }
 
    }

    $('#user_email').keyup(function () {
        validateField($('#user_email'), 'Email', $('#error_message'));
    });

    $('#user_securityCode').keyup(function () {
        validateField($('#user_securityCode'), 'Security Code', $('#error_message'));
    });

    $('#user_newPassword0').keyup(function () {
        validateField($('#user_newPassword0'), 'New Password', $('#error_message'));
    });

    $('#user_newPassword1').keyup(function () {
        validateField($('#user_newPassword1'), 'Confirm New Password', $('#error_message'));
    });
    

});