import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Aquí deberías agregar la lógica para verificar si el usuario está autenticado.
  // Puedes acceder al estado actual de la ruta y a otros servicios si es necesario.

  // Por ejemplo, podrías verificar si el usuario está autenticado recuperando la información del almacenamiento local:
  const isLoggedIn = !!localStorage.getItem('token');

  // Si el usuario está autenticado, permitir la navegación.
  // De lo contrario, redirigir al usuario a la página de inicio de sesión.
  if (isLoggedIn) {
    return true;
  } else {
    // Puedes redirigir al usuario a la página de inicio de sesión o a cualquier otra ruta.
    // Aquí, estamos redirigiendo al usuario a la ruta '/login'.
    // Puedes cambiar esto según tu estructura de rutas.
    state.url = '/login';
    return false;
  }
};
