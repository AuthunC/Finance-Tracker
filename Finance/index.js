const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const balanceElement = document.getElementById('balance');

let transactions = [];

// add transaction function
function addTransaction(event) {
  event.preventDefault();

  const description = descriptionInput.value;
  const amount = +amountInput.value;
  const type = typeInput.value;

  const transaction = { description, amount, type };
  transactions.push(transaction);

  updateUI();
  clearForm();
}
// delete transaction function
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}
// function to update the UI

function updateUI() {
  transactionList.innerHTML = '';

  let balance = 0;

  transactions.forEach((transaction, index) => {
    const { description, amount, type } = transaction;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${description}</span>
      <span>${type === 'income' ? '+' : '-'}Rs : ${Math.abs(amount).toFixed(2)}</span>
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;

    transactionList.appendChild(listItem);

    balance += type === 'income' ? amount : -amount;
  });

  balanceElement.textContent = `Current Balance: Rs: ${balance.toFixed(2)}`;
}

// function to clear the form
function clearForm() {
  descriptionInput.value = '';
  amountInput.value = '';
}

form.addEventListener('submit', addTransaction);
