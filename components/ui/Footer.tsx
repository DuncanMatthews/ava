import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} MeetAVA. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="/terms" className="hover:underline text-black">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:underline text-black">
            Privacy Policy
          </a>
          <a href="/contact" className="hover:underline text-black">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
