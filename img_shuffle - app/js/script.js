$(document).ready(function() {

	var balance = 0;
	$('#balance').text(`$${balance}.00`);
	var stakeVal = 0;
	var images = Array.from(document.querySelectorAll('img'));

	//Deposit
	function deposit() {
		var bal = new Number(balance);
		var depositVal = new Number($('#deposit').val());

		if(depositVal != '' && depositVal >= 5) {
			var currBal = depositVal + bal;	
			$('#balance').text(`$${currBal}.00`);
			balance = currBal;
			$('#stakeMessage').text('');
			$('#depositMessage').text('Deposit Successful').addClass('text-success').fadeOut(10000);
			$('#deposit').val('');
			$('#balanceMsg').text('');
			$('.stakeBox').show();
		} else {
			$('#depositMessage').text('Minimum Deposit is $5!').addClass('text-danger');
			$('#stakeMessage').text('');
		}		
	}

	//Stake
	function stake() {
		var stakeValue = new Number($('#stake').val());

		if(stakeValue > balance) {
			$('#stakeMessage').text(`Insufficient Balance!!`);
			$('#stake').val('');
			return false;
		}

		if(stakeValue != '' && stakeValue >= 5) {
			$('#stakeValBox').text(`$${stakeValue}.00`);
			stakeVal = stakeValue;
			$('#stakeMessage').text('Stake placed. Proceed to Spin');
			$('#stake').val('');
			$('#balanceMsg').text('');
		} else {
			$('#stakeMessage').text('Minimum stake is $5.');
			$('#stake').val('');

		}
	}

	function testSpin() {
		var test = images.every(img => img.outerHTML == images[0].outerHTML);
        // console.log(test);
        if(test) {
        	console.log('Hello');
        	var winValue = stakeVal * 10;
        	balance += winValue;
        	$('#outcomeMsg').text(`BOOOOOOMM!! $${stakeVal} * ${10} = $${winValue}`);
        	$('#balance').text(`$${balance}.00`);
        	$('#okBtn').show();
        	stakeVal = 0;
        } else {
        	console.log('Naylo');
        	balance -= stakeVal;
        	$('#balance').text(`$${balance}.00`);
        	$('#outcomeMsg').text('Unlucky! Try Again!!');
        	$('#okBtn').show();
        	stakeVal = 0;
        }
	}

	//Spin Images
	function spin() {
		var myImages = [
            "usa.gif",
            "canada.gif",
            "jamaica.gif",
            "mexico.gif"
        ];

        if(balance >= 5 && stakeVal >= 5) {
			$('.images img').each(function() {
	            var newImgNumber = Math.round(Math.random() * 3);
	            $(this).attr('src', myImages[newImgNumber]);
	        });
        	$('#stakeValBox').text(`$${0}.00`);
        	$('#stakeMessage').text('');
        	testSpin();
		} else {
			$('#balanceMsg').text('Insufficient Balance or stake. Please deposit or stake at least $5 to play');
		}
	}


	$('#spinBtn').click(spin);

	$('#depositBtn').click(function() {
		deposit();
	});

	$('#stakeBtn').click(stake);

	$('#okBtn').click(function() {
		$(this).hide();
		$('#outcomeMsg').text('');
	});


});