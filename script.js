// Access DOM elements
const passwordForm = document.getElementById('passwordForm');
const accountTableBody = document.querySelector('#accountTable tbody');

let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

// Display accounts when the page loads
document.addEventListener('DOMContentLoaded', displayAccounts);

// Add an account
passwordForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const account = { website, username, password };

    // Add to accounts array and save in local storage
    accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Display updated list and reset form
    displayAccounts();
    passwordForm.reset();
});

// Display accounts in the table
function displayAccounts() {
    accountTableBody.innerHTML = ''; // Clear table

    accounts.forEach((account, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${account.website}</td>
            <td>${account.username}</td>
            <td>${account.password}</td>
            <td>
                <button onclick="editAccount(${index})">Edit</button>
                <button onclick="deleteAccount(${index})">Delete</button>
            </td>
        `;

        accountTableBody.appendChild(row);
    });
}

// Edit an account
function editAccount(index) {
    const account = accounts[index];

    // Fill form with account details
    document.getElementById('website').value = account.website;
    document.getElementById('username').value = account.username;
    document.getElementById('password').value = account.password;

    // Remove the old account and allow for updating
    accounts.splice(index, 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Delete an account
function deleteAccount(index) {
    accounts.splice(index, 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    displayAccounts();
}
