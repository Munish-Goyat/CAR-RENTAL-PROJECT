
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent page reload

  // Collect form data
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // You can now send this data to the server via AJAX or log it
  console.log("Email: " + email);
  console.log("Password: " + password);

  // Proceed with further actions like making an API call to create the account
});






