
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const FoundersSection = () => {
  const founders = [
    {
      role: "Lead Developer",
      description: "Pioneering the future of democratic systems through blockchain technology and secure voting solutions.",
      image: "/lovable-uploads/27352adc-2017-4c57-b891-40fed7168b0b.png", 
      index: 0
    },
    {
      role: "Founder",
      description: "With a passion for transparency and innovation, committed to revolutionizing the way we vote.",
      image: "/lovable-uploads/fe2b1571-aeba-4ca8-934d-1a3a08237274.png", // Updated to new image
      index: 1
    },
    {
      role: "Technical Lead",
      description: "Driving technical excellence and innovation in blockchain-based voting systems.",
      image: "/lovable-uploads/a9a77299-2b0e-4962-8400-a7b25b35a074.png",
      index: 2
    },
    {
      role: "Security Lead",
      description: "Ensuring robust security protocols and protecting the integrity of every vote cast.",
      image: "/lovable-uploads/d3e35e3c-6522-4d09-8c53-c86954980ae0.png",
      index: 3
    }
  ];

  return (
    <section className="py-20 px-6 relative bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Founders</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <Avatar className="mb-4 w-[200px] h-[200px] border-4 border-white shadow-lg">
                <AvatarImage 
                  src={founder.image} 
                  alt={founder.role}
                  className="object-cover rounded-full w-full h-full"
                />
                <AvatarFallback className="rounded-full">{founder.role[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-2">{founder.role}</h3>
              <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{founder.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12 space-x-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-all">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-all">
            <Github size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-all">
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
