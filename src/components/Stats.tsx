const stats = [
  { value: "10M+", label: "Threats Blocked" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Detection Rate" },
  { value: "24/7", label: "Support Available" },
];

const Stats = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-cyber mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
