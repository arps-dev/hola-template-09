import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useFirebaseAuth();
  const [loading, setLoading] = useState(false);

  // Reload site when component unmounts (page is closed/navigated away)
  useEffect(() => {
    return () => {
      // Small delay to ensure navigation completes before reload
      setTimeout(() => {
        if (window.location.pathname !== '/login') {
          window.location.reload();
        }
      }, 100);
    };
  }, []);
  
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn(signInData.email, signInData.password);
    
    if (result.success) {
      window.location.href = "/";
    }
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-sunset opacity-20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-vintage opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-retro opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Card className="w-full max-w-lg relative z-10 retro-card border-2 shadow-xl">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-gradient-sunset p-4 rounded-full shadow-lg">
              <Camera className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent">
              Memories
            </h1>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl retro-heading">Welcome Back</CardTitle>
            <CardDescription className="retro-handwritten text-lg text-muted-foreground">
              ~ Sign in to your account ~
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={signInData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                required
                className="retro-input h-12"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium">
                <Lock className="h-4 w-4 text-primary" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={signInData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                required
                className="retro-input h-12"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full btn-retro text-white font-semibold py-4 text-lg mt-8 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: 'var(--gradient-sunset)',
                border: 'none'
              }}
            >
              {loading ? "Signing In..." : "🎉 Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground retro-handwritten text-base">
                  New to Memories?
                </span>
              </div>
            </div>
            <Link 
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 text-primary hover:text-primary/80 transition-colors font-semibold rounded-lg hover:bg-primary/5"
            >
              Create Your Account
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <button 
              onClick={() => window.location.href = "/"}
              className="flex items-center justify-center space-x-2 text-muted-foreground hover:text-foreground transition-colors py-2 w-full bg-transparent border-none cursor-pointer"
            >
              <span>← Back to Home</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;