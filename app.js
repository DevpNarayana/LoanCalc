// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {

    // hide results
    document.querySelector('#results').style.display = 'none';
    // show loader
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults() {
    // UI vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    // console.log(totalInterest);
    const principle = parseFloat(amount.value);
    const calInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayments = parseFloat(years.value) * 12;


    // compute monthly payment
    const x = Math.pow(1 + calInterest, calcPayments);
    const monthly = (principle * calInterest) / (x - 1);
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calcPayments).toFixed(2);
        totalInterest.value = ((monthly * calcPayments) - principle).toFixed(2);
        // show results
        document.querySelector('#results').style.display = 'block';
        // hide loader
        document.querySelector('#loading').style.display = 'none';

    } else {

        showError('Please Check your numbers');
    }
}

function showError(error) {

    // show results
    document.querySelector('#results').style.display = 'none';
    // hide loader
    document.querySelector('#loading').style.display = 'none';
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // create a div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);
    // clear error after some time
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}