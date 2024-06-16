const loginBtn = $('#loginBtn');
const registerBtn = $('#registerBtn');

async function register() {
  try {
    const name = $('#registerName').val();
    const lastname = $('#registerLastname').val();
    const email = $('#registerEmail').val();
    const password = $('#registerPassword').val();

    let url = 'https://auth-ms-two.vercel.app/api/auth';

    const response = await fetch(`${url}/register`, {
      method: 'POST',
      body: JSON.stringify({ name, lastname, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    const errors = result.errors;

    if (errors) {
      let errorMsgs = '';
      for (let field in errors) {
        errorMsgs += `- ${errors[field].msg}\n`;
      }
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errorMsgs.replace(/\n/g, '<br/>'),
      });
    }

    if (!result.ok) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.msg,
      });
    }

    //* Limpiar campos
    $('#registerName').val('');
    $('#registerLastname').val('');
    $('#registerEmail').val('');
    $('#registerPassword').val('');

    return Swal.fire({
      icon: 'success',
      title: `¡Te has registrado correctamente ${result.user.name}!`,
      text: 'Ya puedes iniciar sesión',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al registrarte',
    });
  }
}

async function login() {
  try {
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();

    let url = 'https://auth-ms-two.vercel.app/api/auth';

    const response = await fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    const errors = result.errors;

    if (errors) {
      let errorMsgs = '';
      for (let field in errors) {
        errorMsgs += `- ${errors[field].msg}\n`;
      }
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errorMsgs.replace(/\n/g, '<br/>'),
      });
    }

    if (!result.ok) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.msg,
      });
    }

    //* Limpiar campos
    $('#loginEmail').val('');
    $('#loginPassword').val('');

    return Swal.fire({
      icon: 'success',
      title: `¡Bienvenido ${result.user.name}!`,
      text: 'Has iniciado sesión correctamente',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al iniciar sesión',
    });
  }
}

loginBtn.click((e) => {
  e.preventDefault();
  login();
});

registerBtn.click((e) => {
  e.preventDefault();
  register();
});
