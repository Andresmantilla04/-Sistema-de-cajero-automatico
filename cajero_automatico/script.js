var cuentas = [
    { nombre: "andres", saldo: 200, password: "2004" },
    { nombre: "david", saldo: 290, password: "1012" },
    { nombre: "mantilla", saldo: 67, password: "1015" }
  ];
  
  var selectedAccount = "";
  var password = "";
  
  function showOptions() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("options").style.display = "block";
  }
  
  function showBalance() {
    var account = cuentas.find(function(cuenta) {
      return cuenta.nombre === selectedAccount;
    });
  
    document.getElementById("options").style.display = "none";
    document.getElementById("balance").style.display = "block";
    document.getElementById("balance-amount").textContent = "$" + account.saldo;
  }
  

  function makeDeposit() {
    var depositAmount = prompt("Ingrese el monto a depositar:");
    depositAmount = parseFloat(depositAmount);
  
    if (isNaN(depositAmount) || depositAmount <= 0) {
      showMessage("Por favor, ingrese un monto válido.");
      return;
    }
  
    var account = cuentas.find(function(cuenta) {
      return cuenta.nombre === selectedAccount;
    });
  
    var newBalance = account.saldo + depositAmount;
  
    if (newBalance > 990) {
      showMessage("No se puede exceder el límite de saldo ($990).");
      return;
    }
  
    account.saldo = newBalance;
    document.getElementById("options").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("transaction-info").textContent = "Has ingresado $" + depositAmount.toFixed(2);
    document.getElementById("new-balance").textContent = "Nuevo saldo: $" + newBalance.toFixed(2);
  }
  
  function makeWithdrawal() {
    var withdrawalAmount = prompt("Ingrese el monto a retirar:");
    withdrawalAmount = parseFloat(withdrawalAmount);
  
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      showMessage("Por favor, ingrese un monto válido.");
      return;
    }
  
    var account = cuentas.find(function(cuenta) {
      return cuenta.nombre === selectedAccount;
    });
  
    if (withdrawalAmount > account.saldo) {
      showMessage("No tienes suficiente saldo para realizar esta transacción.");
      return;
    }
  
    var newBalance = account.saldo - withdrawalAmount;
  
    if (newBalance < 10) {
      showMessage("No se puede tener un saldo menor a $10.");
      return;
    }
  
    account.saldo = newBalance;
    document.getElementById("options").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("transaction-info").textContent = "Has retirado $" + withdrawalAmount.toFixed(2);
    document.getElementById("new-balance").textContent = "Nuevo saldo: $" + newBalance.toFixed(2);
  }
  
  function showMessage(message) {
    var messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.display = "block";
    setTimeout(function() {
      messageElement.style.display = "none";
      messageElement.textContent = "";
    }, 3000);
  }
  
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    selectedAccount = document.getElementById("account").value;
    password = document.getElementById("password").value;
  
    var account = cuentas.find(function(cuenta) {
      return cuenta.nombre === selectedAccount;
    });
  
    if (!account || account.password !== password) {
      showMessage("Cuenta o contraseña incorrecta. Intenta nuevamente.");
      document.getElementById("password").value = "";
      return;
    }
  
    showOptions();
  });
  
  document.getElementById("check-balance").addEventListener("click", function() {
    showBalance();
  });
  
  document.getElementById("deposit").addEventListener("click", function() {
    makeDeposit();
  });
  
  document.getElementById("withdraw").addEventListener("click", function() {
    makeWithdrawal();
  });
  
  