
import { ShieldCheckIcon, LockIcon, ListIcon } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: "Secure Voting",
      description: "Every vote is encrypted and stored securely on the blockchain."
    },
    {
      icon: <LockIcon className="h-6 w-6" />,
      title: "Immutable Records",
      description: "Once cast, votes cannot be altered or tampered with."
    },
    {
      icon: <ListIcon className="h-6 w-6" />,
      title: "Real-time Results",
      description: "View election results as they happen with full transparency."
    }
  ];

  return (
    <section className="py-16 px-6 bg-amber-50 traditional-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Key Features</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="border border-amber-200 rounded-lg p-6 glass-effect card-hover bg-gradient-to-b from-amber-50 to-amber-100/30"
            >
              <div className="text-amber-600 p-3 rounded-full bg-amber-100 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-amber-800/80">{feature.description}</p>
              <div className="mt-4 border-t border-dashed border-amber-200 pt-4">
                <div className="w-6 h-6 indian-border rounded-full mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
