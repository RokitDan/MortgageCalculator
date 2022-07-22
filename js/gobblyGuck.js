function displayPayments(paymentsObject) {
  createPaymentsObject();
  const numberFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let paymentDataTemplate = document.getElementById("paymentDataTemplate");
  let tBodyPayments = document.getElementById("tBodyPayments");
  tBodyPayments.innerHTML = "";

  for (let index = 0; index < paymentsObject.length; index++) {
    let eventNode = document.importNode(paymentsObject.content, true);
    let tBodyColumns = eventNode.querySelectorAll("td");
    tBodyColumns[0].textContent = paymentsObject[index].month;
    tBodyColumns[1].textContent = paymentsObject[index].payment;
    tBodyColumns[2].textContent = paymentsObject[index].principal;
    tBodyColumns[3].textContent = paymentsObject[index].interest;
    tBodyColumns[4].textContent = paymentsObject[index].totalInterest;
    tBodyColumns[5].textContent = paymentsObject[index].balance;
  }
