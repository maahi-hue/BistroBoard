const Footer = () => {
  return (
    <div>
      <footer className="footer bg-[#354f52] p-10 text-white">
        <nav>
          <h6 className="footer-title">Our Services</h6>
          <a className="link link-hover">Dine-In & Takeaway</a>
          <a className="link link-hover">Online Reservations</a>
          <a className="link link-hover">Event Catering</a>
        </nav>
        <nav>
          <h6 className="footer-title">About Us</h6>
          <a className="link link-hover">Our Story</a>
          <a className="link link-hover">Customer Testimonials</a>
          <a className="link link-hover">Join Our Team</a>
        </nav>
        <nav>
          <h6 className="footer-title">Support</h6>
          <a className="link link-hover">FAQs</a>
          <a className="link link-hover">Refund Policy</a>
          <a className="link link-hover">Contact Us</a>
        </nav>
      </footer>
      <footer className="footer bg-[#354f52] text-white border-base-300 border-t px-10 py-4">
        <aside className="mx-auto text-center">
          <p>
            <strong>BistroBoard</strong>
            <br />
            Serving Delicious Memories | Since 2024
          </p>
          <p>© 2024 BistroBoard. All rights reserved.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
