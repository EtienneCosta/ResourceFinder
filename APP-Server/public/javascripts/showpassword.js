function showPassword() {
    var x = document.getElementById("your_pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }