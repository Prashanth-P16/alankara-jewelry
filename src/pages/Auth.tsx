import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import * as storage from "@/lib/localStorage";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { user, error } = storage.signIn(email, password);
      if (error) {
        toast.error(error);
      } else if (user) {
        storage.setCurrentUser(user);
        toast.success("Logged in successfully");
        navigate("/admin");
        window.location.reload();
      }
    } else {
      const { user, error } = storage.signUp(email, password);
      if (error) {
        toast.error(error);
      } else if (user) {
        storage.setCurrentUser(user);
        toast.success(user.isAdmin ? "Admin account created!" : "Account created!");
        navigate("/admin");
        window.location.reload();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            {isLogin ? "Admin Login" : "Create Account"}
          </h1>
          <div className="gold-divider mb-3" />
          <p className="text-sm text-muted-foreground">ALANKARA by Karthika</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-4 py-3 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
