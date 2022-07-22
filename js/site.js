//driver function

function getValues() {
  let loanAmount = parseInt(document.getElementById("entryLoanAmount").value);
  let term = parseInt(document.getElementById("entryTerm").value);
  let rate = parseFloat(document.getElementById("entryRate").value);

  if (
    Number.isInteger(loanAmount) &&
    Number.isInteger(term) &&
    Number.isInteger(rate)
  ) {
    let paymentObjects = calculatePayments(loanAmount, term, rate);
    displayBigMonthlyPayment(loanAmount, term, rate);
    displayPayments(paymentObjects);
  } else {
    Swal.fire({
      backdrop: false,
      title: "INPUT",
      text: "Please provide values for Loan Amount, Term (Months), and Interest Rate",
    });
  }
}

function calculatePayments(loanAmount, term, rate) {
  const numberFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let paymentObjects = [];

  for (let index = 0; index < term; index++) {
    let month = index + 1;
    let previousRemainingBalance = 0;
    if (month === 1) {
      previousRemainingBalance = loanAmount;
    } else {
      previousRemainingBalance = paymentObjects[index - 1].balance;
    }

    let monthlyRate = rate / 1200;
    let monthlyPayment =
      (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    let interest = previousRemainingBalance * monthlyRate;
    let principal = monthlyPayment - interest;
    let balance = previousRemainingBalance - principal;
    let totalInterest = 0;
    if (month === 1) {
      totalInterest = interest;
    } else {
      totalInterest = interest + paymentObjects[index - 1].totalInterest;
    }

    let createPaymentObjects = {
      month: month,
      monthlyPayment: monthlyPayment,
      principal: principal,
      interest: interest,
      totalInterest: totalInterest,
      balance: balance,
    };

    paymentObjects.push(createPaymentObjects);
  }
  return paymentObjects;
}

function displayBigMonthlyPayment(loanAmount, term, rate) {
  const numberFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  let monthlyRate = rate / 1200;
  let monthlyPayment =
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  let totalInterest = monthlyPayment * term - loanAmount;
  let cost = totalInterest + loanAmount;

  let viewPayment = document.getElementById("viewPayment");
  let displayPrincipal = document.getElementById("displayPrincipal");
  let displayInterest = document.getElementById("displayInterest");
  let displayCost = document.getElementById("displayCost");

  viewPayment.innerHTML = numberFormatter.format(monthlyPayment);
  displayPrincipal.innerHTML = numberFormatter.format(loanAmount);
  displayInterest.innerHTML = numberFormatter.format(totalInterest);
  displayCost.innerHTML = numberFormatter.format(cost);
}

function displayPayments(paymentObjects) {
  const numberFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let paymentDataTemplate = document.getElementById("paymentDataTemplate");
  let tBodyPayments = document.getElementById("tBodyPayments");
  tBodyPayments.innerHTML = "";

  for (let index = 0; index < paymentObjects.length; index++) {
    let paymentObjectNode = document.importNode(
      paymentDataTemplate.content,
      true
    );

    let tBodyColumns = paymentObjectNode.querySelectorAll("td");
    tBodyColumns[0].textContent = paymentObjects[index].month;
    tBodyColumns[1].textContent = numberFormatter.format(
      paymentObjects[index].monthlyPayment
    );
    tBodyColumns[2].textContent = numberFormatter.format(
      paymentObjects[index].principal
    );
    tBodyColumns[3].textContent = numberFormatter.format(
      paymentObjects[index].interest
    );
    tBodyColumns[4].textContent = numberFormatter.format(
      paymentObjects[index].totalInterest
    );
    tBodyColumns[5].textContent = numberFormatter.format(
      paymentObjects[index].balance
    );
    tBodyPayments.appendChild(paymentObjectNode);
  }
}
