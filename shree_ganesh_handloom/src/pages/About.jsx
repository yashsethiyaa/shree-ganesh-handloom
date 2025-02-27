const About = () => {
    const processes = [
      {
        title: 'Handcrafted',
        description: 'Each piece is carefully crafted by skilled artisans using traditional techniques',
        icon: '🧶'
      },
      {
        title: 'Sustainable',
        description: 'We use eco-friendly materials and support sustainable production practices',
        icon: '🌱'
      },
      {
        title: 'Fair Trade',
        description: 'We ensure fair wages and better working conditions for our artisans',
        icon: '♥️'
      }
    ];
  
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">About Us</h1>
          <p className="text-gray-600 text-center mb-12">
            Learn about our journey, mission, and commitment to traditional craftsmanship
          </p>
  
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              HandCraft Haven was founded in 2015 with a vision to preserve and promote traditional handloom craftsmanship while creating beautiful, contemporary home furnishings. Our journey began in the heart of India's textile regions, where we partnered with skilled artisans who have been practicing their craft for generations.
            </p>
            <p className="text-gray-600">
              Today, we work with over 200 artisan families across different regions, helping them sustain their livelihood while bringing their exceptional craftsmanship to homes worldwide.
            </p>
          </div>
  
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Preserving traditional handloom techniques and supporting artisan communities</li>
              <li>Creating sustainable, eco-friendly home furnishings</li>
              <li>Bridging the gap between artisans and global markets</li>
              <li>Offering unique, high-quality products at fair prices</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-2xl font-bold mb-8">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processes.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{process.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;