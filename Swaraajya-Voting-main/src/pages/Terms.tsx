
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/home/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-50 traditional-bg">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <Card className="glass-effect mb-6">
          <CardContent className="p-6">
            <Link to="/">
              <Button variant="outline" className="mb-6 border-amber-500 text-amber-800 hover:bg-amber-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            
            <div className="prose prose-amber max-w-none">
              <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
              <p className="text-amber-800 mb-4">
                By accessing and using the E-Swaraaj platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you may not access or use the Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">2. Description of Service</h2>
              <p className="text-amber-800 mb-4">
                E-Swaraaj provides an electronic voting platform that allows eligible voters to cast votes in designated elections using blockchain technology. The Service is designed to provide secure, transparent, and immutable voting records.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">3. Eligibility</h2>
              <p className="text-amber-800 mb-4">
                To use the Service, you must be an eligible voter as determined by the election administrators. You represent and warrant that the information you provide during registration is accurate and that you meet all eligibility requirements.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">4. User Accounts</h2>
              <p className="text-amber-800 mb-4">
                You are responsible for safeguarding your account credentials and ensuring that no unauthorized persons gain access to your account. Any activities that occur under your account are your responsibility.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">5. Prohibited Conduct</h2>
              <p className="text-amber-800 mb-4">
                You agree not to engage in any activities that may interfere with or disrupt the Service, including attempting to gain unauthorized access, transmitting malware, or conducting fraudulent voting activities.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">6. Privacy</h2>
              <p className="text-amber-800 mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information about you.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">7. Modifications to Terms</h2>
              <p className="text-amber-800 mb-4">
                We may modify these Terms at any time. Your continued use of the Service after any modifications indicates your acceptance of the updated Terms.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">8. Termination</h2>
              <p className="text-amber-800 mb-4">
                We reserve the right to terminate or suspend your access to the Service at any time, for any reason, without notice.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">9. Governing Law</h2>
              <p className="text-amber-800 mb-4">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 p-6">
          <Link to="/">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Return to Home Page
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
