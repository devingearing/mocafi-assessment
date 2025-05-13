$(document).ready(function() {
  $('.modal').modal();

  $('#credit_card').on('input', function() {
    var value = $(this).val().replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var formattedValue = '';

    for(var i = 0; i < value.length; i++) {
      if(i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    $(this).val(formattedValue);
  });


  $('.btn').click(function() {
    var cardNumber = $('#credit_card').val();
    if(!cardNumber) {
      M.toast({html: 'Please enter a card number', classes: 'red'});
      return;
    }

    $.ajax({
      url: '/users/balance',
      type: 'GET',
      data: { cardNumber: cardNumber },
      success: function(response) {
        if(response.success) {
          M.toast({
            html: `Balance: $${response.balance.toFixed(2)}`,
            classes: 'green',
            displayLength: 5000
          });
        } else {
          M.toast({html: response.message, classes: 'red'});
        }
      },
      error: function(xhr, status, error) {
        var errorMessage = xhr.responseJSON?.message || 'An error occurred';
        M.toast({html: errorMessage, classes: 'red'});
      }
    });
  });
});