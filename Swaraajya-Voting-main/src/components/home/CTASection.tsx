
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 px-6 bg-amber-800 text-amber-50 relative overflow-hidden">
      {/* Traditional pattern overlay */}
      <div className="absolute inset-0 sanskrit-pattern opacity-10"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">
            Ready to experience modern voting with traditional values?
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg opacity-90 mb-8">
            Join our secure platform and participate in elections with confidence.
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/admin-login">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-amber-100 text-amber-900 hover:bg-amber-200">
              Login as Admin
            </Button>
          </Link>
          <Link to="/voter-login">
            <Button size="lg" variant="outline" className="bg-transparent border-amber-200 text-amber-50 hover:bg-amber-700/50 w-full sm:w-auto">
              Login as Voter
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Animated background for CTA */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-rotate-slow">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute rounded-full bg-amber-200/20"
                  style={{
                    width: `${Math.random() * 40 + 10}px`,
                    height: `${Math.random() * 40 + 10}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 10}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
