const Newsletter = () => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive updates about new collections, artisan stories, and exclusive offers.
          </p>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input flex-grow"
            />
            <button type="submit" className="custom-button md:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Newsletter;