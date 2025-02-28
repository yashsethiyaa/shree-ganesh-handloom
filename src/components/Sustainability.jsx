const Sustainability = () => {
    const initiatives = [
      {
        id: 1,
        title: 'Eco-Friendly Materials',
        description: 'We use natural, sustainable materials and eco-friendly dyes in our production.',
        icon: '🌱'
      },
      {
        id: 2,
        title: 'Fair Trade Practices',
        description: 'Supporting artisan communities through fair wages and ethical working conditions.',
        icon: '🤝'
      },
      {
        id: 3,
        title: 'Zero Waste Initiative',
        description: 'Implementing zero-waste practices in our production process.',
        icon: '♻️'
      }
    ];
  
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">
            Our Commitment to Sustainability
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {initiatives.map((initiative) => (
              <div key={initiative.id} className="text-center">
                <div className="text-4xl mb-4">{initiative.icon}</div>
                <h3 className="text-xl font-medium mb-3">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Sustainability;