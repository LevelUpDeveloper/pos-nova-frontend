/** Respuesta de `POST api/auth/login` (ASP.NET serializa en camelCase). */
export interface LoginResponse {
  token: string;
  userName: string;
  imageUrl: string | null;
  role: string[];
}
