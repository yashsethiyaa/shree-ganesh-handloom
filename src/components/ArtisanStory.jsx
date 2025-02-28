const ArtisanStory = () => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/artisan.jpg"
              alt="Artisan at work"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-6">Our Artisan Story</h2>
            <p className="text-gray-600 mb-6">
              Each piece in our collection is meticulously crafted by skilled artisans who have inherited
              generations of handloom expertise. We preserve traditional techniques while creating
              contemporary designs that bring timeless elegance to your home.
            </p>
            <button className="custom-button">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default ArtisanStory;