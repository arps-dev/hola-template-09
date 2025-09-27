import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mail, Lock, User, Phone, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useFirebaseAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reload site when component unmounts (page is closed/navigated away)
  useEffect(() => {
    return () => {
      // Small delay to ensure navigation completes before reload
      setTimeout(() => {
        if (window.location.pathname !== '/signup') {
          window.location.reload();
        }
      }, 100);
    };
  }, []);
  
  // Sign Up Form Data
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    college: "",
    password: "",
    confirmPassword: ""
  });

  // Sign In Form Data
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const { signIn } = useFirebaseAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      return;
    }

    if (signUpData.password.length < 6) {
      return;
    }

    setLoading(true);
    const result = await signUp(
      signUpData.email, 
      signUpData.password, 
      signUpData.firstName, 
      signUpData.lastName,
      signUpData.phone,
      signUpData.college
    );
    
    if (result.success) {
      window.location.href = "/";
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn(signInData.email, signInData.password);
    
    if (result.success) {
      window.location.href = "/";
    }
    setLoading(false);
  };

  const handleSignUpInputChange = (field: string, value: string) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignInInputChange = (field: string, value: string) => {
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

      {/* Sign Up Form */}
      <Card className={`w-full max-w-2xl relative z-10 retro-card border-2 shadow-xl ${showLogin ? 'hidden' : 'block'}`}>
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
            <CardTitle className="text-3xl retro-heading">Join Our Community</CardTitle>
            <CardDescription className="retro-handwritten text-lg text-muted-foreground">
              ~ Start capturing your fest memories ~
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="flex items-center space-x-2 text-sm font-medium">
                  <User className="h-4 w-4 text-primary" />
                  <span>First Name</span>
                </Label>
                <Input
                  id="firstName"
                  value={signUpData.firstName}
                  onChange={(e) => handleSignUpInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  required
                  className="retro-input h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="lastName" className="flex items-center space-x-2 text-sm font-medium">
                  <User className="h-4 w-4 text-primary" />
                  <span>Last Name</span>
                </Label>
                <Input
                  id="lastName"
                  value={signUpData.lastName}
                  onChange={(e) => handleSignUpInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  required
                  className="retro-input h-12"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={signUpData.email}
                onChange={(e) => handleSignUpInputChange("email", e.target.value)}
                placeholder="your.email@college.edu"
                required
                className="retro-input h-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="phone" className="flex items-center space-x-2 text-sm font-medium">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={signUpData.phone}
                  onChange={(e) => handleSignUpInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="retro-input h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="college" className="flex items-center space-x-2 text-sm font-medium">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>College/University</span>
                </Label>
                <Input
                  id="college"
                  value={signUpData.college}
                  onChange={(e) => handleSignUpInputChange("college", e.target.value)}
                  placeholder="Enter your college name"
                  required
                  className="retro-input h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => handleSignUpInputChange("password", e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="retro-input h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="flex items-center space-x-2 text-sm font-medium">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Confirm Password</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => handleSignUpInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="retro-input h-12"
                />
              </div>
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
              {loading ? "Creating Account..." : "🚀 Create Account"}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground retro-handwritten text-base">
                  Already have an account?
                </span>
              </div>
            </div>
            <Button 
              variant="ghost"
              onClick={() => setShowLogin(true)}
              className="inline-flex items-center justify-center px-6 py-3 text-primary hover:text-primary/80 transition-colors font-semibold rounded-lg hover:bg-primary/5"
            >
              Sign In Here
            </Button>
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

      {/* Sign In Form */}
      <Card className={`w-full max-w-lg relative z-10 retro-card border-2 shadow-xl ${showLogin ? 'block' : 'hidden'}`}>
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
              <Label htmlFor="signInEmail" className="flex items-center space-x-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email Address</span>
              </Label>
              <Input
                id="signInEmail"
                type="email"
                value={signInData.email}
                onChange={(e) => handleSignInInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                required
                className="retro-input h-12"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="signInPassword" className="flex items-center space-x-2 text-sm font-medium">
                <Lock className="h-4 w-4 text-primary" />
                <span>Password</span>
              </Label>
              <Input
                id="signInPassword"
                type="password"
                value={signInData.password}
                onChange={(e) => handleSignInInputChange("password", e.target.value)}
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
            <Button 
              variant="ghost"
              onClick={() => setShowLogin(false)}
              className="inline-flex items-center justify-center px-6 py-3 text-primary hover:text-primary/80 transition-colors font-semibold rounded-lg hover:bg-primary/5"
            >
              Create Your Account
            </Button>
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

export default SignUp;