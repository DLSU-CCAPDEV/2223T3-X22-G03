$(document).ready(function () {

    function isFilled() {

        var user_idNumber = validator.trim($('#user_idNumber').val());
        var user_password = validator.trim($('#user_password').val());

        var idNumEmpty = validator.isEmpty(user_idNumber);
        var passwordEmpty = validator.isEmpty(user_password);

        return !idNumEmpty && !passwordEmpty;
    }

    async function isValidID(field, callback) {

        var idNum = validator.trim($('#user_idNumber').val());

        var onlyNumbers = /^[0-9]*$/;
        if (!onlyNumbers.test(idNum)) {
            $("#error_box").css('display', 'block');
            $('#error_message').text('ID number should contain only numbers.');
            return callback(false);
        }
        else{

            var isValidLength = validator.isLength(idNum, {min: 8, max: 8});

            if(!isValidLength) {

                if(field.is($('#user_idNumber'))){
                    $('#error_box').css('display', 'block');
                    $('#error_message').text('ID number should contain exactly 8 digits.');
                }
                    
                return callback(false);

            }
            else{

                return callback(true);
                
            }

        }
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

        isValidID(field, function (validID) {

            if( filled && validID ) {
                $('#submit').prop('disabled', false);
                $('#submit').css('background', 'green');
                $('#submit').css('cursor', 'pointer');
            }
            else{
                $('#submit').prop('disabled', true);
                $('#submit').css('background', '#cccccc');
                $('#submit').css('cursor', 'not-allowed');
            }
                
        });
    }

    $('#user_idNumber').keyup(function () {
        validateField($('#user_idNumber'), 'ID Number', $('#error_message'));
    });

    $('#user_password').keyup(function () {
        validateField($('#user_password'), 'Password', $('#error_message'));
    });
    

});