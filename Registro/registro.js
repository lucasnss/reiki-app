document.getElementById("registroForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const usuario = document.getElementById("usuario").value.trim()
  const contraseña = document.getElementById("contraseña").value.trim()

  fetch("http://localhost:3001/api/auth/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contraseña })
  })
    .then(res => res.json())
    .then(data => {
      if (data.mensaje) {
        alert("✅ Registro exitoso")
        window.location.href = "../LogIn/indexLog.html"
      } else {
        alert("❌ " + data.error)
      }
    })
    .catch(err => {
      alert("Error al registrar usuario")
      console.error(err)
    })
})
