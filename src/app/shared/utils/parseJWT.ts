/**
 * @alias parseJWT - parses JWT from passed auth token
 * @param token - auth JSON Web Token received from auth provider
 */
export function parseJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64)
    .split('')
    .map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

  return JSON.parse(jsonPayload);
}
