import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthProtectedContentProps {
  children: ReactNode;
  protectionType?: 'blur' | 'modal' | 'redirect';
  message?: string;
  className?: string;
  showLoginButton?: boolean;
  showSignUpButton?: boolean;
}

const AuthProtectedContent = ({ 
  children, 
  protectionType = 'blur',
  message = "Please sign in to view this content",
  className = "",
  showLoginButton = true,
  showSignUpButton = true
}: AuthProtectedContentProps) => {
  const { user, loading } = useFirebaseAuth();
  const navigate = useNavigate();

  // Show loading state
  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-muted rounded-lg h-64"></div>
      </div>
    );
  }

  // If user is authenticated, show content normally
  if (user) {
    return <>{children}</>;
  }

  // Handle different protection types for unauthenticated users
  switch (protectionType) {
    case 'redirect':
      // Automatically redirect to login
      navigate('/login');
      return null;

    case 'modal':
      // Show modal overlay
      return (
        <div className={`relative ${className}`}>
          {/* Blurred background content */}
          <div className="filter blur-md pointer-events-none select-none">
            {children}
          </div>
          
          {/* Modal overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="max-w-md mx-4 bg-card/95 backdrop-blur-sm border border-border/50">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="retro-heading text-xl font-semibold text-foreground">
                    Authentication Required
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {message}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {showLoginButton && (
                    <Button 
                      onClick={() => navigate('/login')}
                      className="flex-1 bg-gradient-sunset text-white hover:opacity-90 transition-opacity"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  )}
                  {showSignUpButton && (
                    <Button 
                      onClick={() => navigate('/signup')}
                      variant="outline"
                      className="flex-1 border-primary/30 hover:border-primary/50"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case 'blur':
    default:
      // Show blurred content with overlay message
      return (
        <div className={`relative ${className}`}>
          {/* Blurred background content */}
          <div className="filter blur-md pointer-events-none select-none opacity-50">
            {children}
          </div>
          
          {/* Overlay message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 max-w-sm mx-4">
              <div className="mx-auto w-12 h-12 bg-gradient-vintage rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              
              <div className="space-y-2">
                <h4 className="retro-heading text-lg font-semibold text-foreground">
                  Sign In Required
                </h4>
                <p className="text-muted-foreground text-sm">
                  {message}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {showLoginButton && (
                  <Button 
                    size="sm"
                    onClick={() => navigate('/login')}
                    className="bg-gradient-sunset text-white hover:opacity-90 transition-opacity"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
                {showSignUpButton && (
                  <Button 
                    size="sm"
                    onClick={() => navigate('/signup')}
                    variant="outline"
                    className="border-primary/30 hover:border-primary/50"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default AuthProtectedContent;