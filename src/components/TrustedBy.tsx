

const TrustedBy = () => {
  const clients = [
    { name: "TechCorp", logo: "TC" },
    { name: "DataFlow", logo: "DF" },
    { name: "SecureNet", logo: "SN" },
    { name: "CloudBase", logo: "CB" },
    { name: "NetGuard", logo: "NG" },
    { name: "CyberTech", logo: "CT" },
  ];

  return (
    <section className="py-16 border-y border-border bg-card/30">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by industry leaders worldwide
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="group flex items-center gap-3 opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-muted to-secondary flex items-center justify-center font-bold text-lg text-primary group-hover:glow-cyber transition-all duration-300">
                {client.logo}
              </div>
              <span className="text-muted-foreground font-medium hidden sm:block group-hover:text-foreground transition-colors">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
