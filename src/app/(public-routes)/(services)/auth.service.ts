import api from "@/api";
import { User } from "@/types/user";

interface SignUpData extends Omit<User, "id" | "address"> {
  password: string;
}

class AuthService {
  async signIn(email: string, password: string) {
    return await api.post("/session", { email, password });
  }

  async me() {
    return await api.get("/user");
  }

  async signUp(data: SignUpData) {
    return await api.post("/user", data);
  }

  async sendEmailReconveyPassword(email: string) {
    return await api.post("/user/forgot-password", { email });
  }

  async verifyToken(token: string, email: string) {
    return await api.get("/user/verify-recovery-token", {
      params: { token, email },
    });
  }

  async verifyTokenInChangePassword(token: string, email: string) {
    return await api.get("/user/verify-token-in-change-password", {
      params: { token, email },
    });
  }

  async changePassword(token: string, email: string, password: string) {
    return await api.put("/user/reset-password", { token, email, password });
  }
}

export const authService = new AuthService();
