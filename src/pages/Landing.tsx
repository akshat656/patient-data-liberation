
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, FileText, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-medical-blue to-medical-purple py-16 md:py-24">
          <div className="medical-container">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-white mb-10 md:mb-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Take Control of Your Medical Records
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">
                  Secure, transparent, and patient-centric blockchain solution for medical record management and distribution.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-white text-medical-purple hover:bg-gray-100 text-lg px-6 py-2 h-auto"
                    asChild
                  >
                    <Link to="/dashboard">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 text-lg px-6 py-2 h-auto"
                    asChild
                  >
                    <Link to="/learn">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-10">
                <div className="bg-white/90 rounded-lg shadow-xl p-6 backdrop-blur-sm">
                  <img 
                    src="/placeholder.svg" 
                    alt="Medical Records Blockchain" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="medical-container">
            <h2 className="text-3xl font-bold text-center text-medical-dark mb-12">
              Why Choose MedChain?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-purple/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-medical-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-medical-dark">Secure & Immutable</h3>
                <p className="text-gray-600">
                  Your medical records are encrypted and stored on a secure blockchain network, ensuring data integrity and protection from unauthorized changes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-blue/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-medical-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-medical-dark">Patient Control</h3>
                <p className="text-gray-600">
                  You decide who can access your medical records and for how long. Share securely with healthcare providers as needed.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-medical-green/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-medical-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-medical-dark">Universal Access</h3>
                <p className="text-gray-600">
                  Access your complete medical history anytime, anywhere. No more fragmented records across multiple healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="medical-container">
            <h2 className="text-3xl font-bold text-center text-medical-dark mb-6">
              How It Works
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              MedChain uses blockchain technology to provide secure, transparent, and patient-controlled management of medical records.
            </p>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>
              
              {/* Timeline items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Item 1 */}
                <div className="md:text-right md:pr-8 relative">
                  <div className="hidden md:block absolute right-0 top-5 transform translate-x-1/2 w-4 h-4 rounded-full bg-medical-purple border-4 border-white"></div>
                  <h3 className="text-xl font-semibold mb-2 text-medical-purple">Upload Medical Records</h3>
                  <p className="text-gray-600">
                    Healthcare providers upload your medical records to the secure platform.
                  </p>
                </div>
                <div className="md:pl-8 md:mt-24"></div>
                
                {/* Item 2 */}
                <div className="md:pr-8 md:mt-24"></div>
                <div className="md:pl-8 relative">
                  <div className="hidden md:block absolute left-0 top-5 transform -translate-x-1/2 w-4 h-4 rounded-full bg-medical-blue border-4 border-white"></div>
                  <h3 className="text-xl font-semibold mb-2 text-medical-blue">Blockchain Verification</h3>
                  <p className="text-gray-600">
                    Records are cryptographically secured and verified on the blockchain, ensuring integrity and authenticity.
                  </p>
                </div>
                
                {/* Item 3 */}
                <div className="md:text-right md:pr-8 relative">
                  <div className="hidden md:block absolute right-0 top-5 transform translate-x-1/2 w-4 h-4 rounded-full bg-medical-purple border-4 border-white"></div>
                  <h3 className="text-xl font-semibold mb-2 text-medical-purple">Manage & Control</h3>
                  <p className="text-gray-600">
                    You have full control over your records. View, manage, and decide who can access them.
                  </p>
                </div>
                <div className="md:pl-8 md:mt-24"></div>
                
                {/* Item 4 */}
                <div className="md:pr-8 md:mt-24"></div>
                <div className="md:pl-8 relative">
                  <div className="hidden md:block absolute left-0 top-5 transform -translate-x-1/2 w-4 h-4 rounded-full bg-medical-blue border-4 border-white"></div>
                  <h3 className="text-xl font-semibold mb-2 text-medical-blue">Secure Sharing</h3>
                  <p className="text-gray-600">
                    Share your records with healthcare providers securely and temporarily, maintaining your privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-medical-dark text-white">
          <div className="medical-container text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Medical Data Liberation Movement</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Take control of your medical records today and experience the security, transparency, and convenience of blockchain technology.
            </p>
            <Button 
              className="bg-medical-purple hover:bg-purple-700 text-lg px-8 py-2 h-auto"
              asChild
            >
              <Link to="/register">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
