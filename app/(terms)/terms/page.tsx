// components/ui/TermsOfService.tsx

import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
      <p className="mb-6 text-lg">
        Welcome to MeetAVA. By using our service, you agree to the following terms and conditions.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
      <p className="mb-6 text-base">
        By accessing or using MeetAVA, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">2. Changes to Terms</h2>
      <p className="mb-6 text-base">
        We reserve the right to modify these terms at any time. We will notify you of changes by posting them on our website.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
      <p className="mb-6 text-base">
        You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities under your account.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">4. Usage</h2>
      <p className="mb-6 text-base">
        Users are expected to use the service in compliance with all applicable laws and not to misuse it in any way.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
      <p className="mb-6 text-base">
        All content, trademarks, and data on this site are the property of MeetAVA. You may not reproduce or distribute any content without our permission.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
      <p className="mb-6 text-base">
        We may terminate or suspend your access to the service immediately, without prior notice, if you breach these terms.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
      <p className="mb-6 text-base">
        MeetAVA is not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the service.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
      <p className="mb-6 text-base">
        These terms shall be governed and construed in accordance with the laws of the jurisdiction where MeetAVA operates.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
      <p className="mb-6 text-base">
        If you have any questions about these Terms, please contact us at <a href="mailto:support@meetava.io" className="text-blue-600 hover:underline">support@meetava.io</a>.
      </p>
    </div>
  );
};

export default TermsOfService;
