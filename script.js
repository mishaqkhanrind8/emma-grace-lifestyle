document.getElementById("subscribeForm").addEventListener("submit", function(event) {
  event.preventDefault(); // stop actual form submission

  const message = document.getElementById("successMessage");
  message.style.display = "block"; // show message

  this.reset(); // clear input field

  // hide message after 5 seconds
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
});