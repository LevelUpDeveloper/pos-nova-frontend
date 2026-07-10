export interface LoginResponse {
  token: string;
  userName: string;
  ImagenUrl: string | null;
  Role: string[];
}