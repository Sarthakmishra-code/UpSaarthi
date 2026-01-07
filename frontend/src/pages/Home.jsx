import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          UpSaarthi
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted guide for growth — connecting real people with real
          experience, powered by intelligent matching.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/ask"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium"
          >
            Ask a Question
          </Link>
          <Link
            to="/experts"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md font-medium"
          >
            Explore Experts
          </Link>
        </div>
      </section>

      {/* What is UpSaarthi */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          What is UpSaarthi?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            title="Human Expertise First"
            description="Get guidance from verified professionals, not anonymous answers or bots."
          />
          <Feature
            title="AI-Assisted Matching"
            description="AI helps route your question to the most relevant experts based on intent and domain."
          />
          <Feature
            title="Trust & Verification"
            description="Expert profiles, resumes, and experience are reviewed to ensure authenticity."
          />
        </div>
      </section>

      {/* Who is it for */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Who is UpSaarthi for?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Audience
            title="Students & Learners"
            text="Get mentorship for real-world projects, career choices, and technical challenges."
          />
          <Audience
            title="Founders & Builders"
            text="Get business, tech, or hiring guidance without building full teams early."
          />
          <Audience
            title="Experienced & Retired Professionals"
            text="Share your experience, stay engaged, and mentor the next generation."
          />
        </div>
      </section>

      {/* AI Explanation */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          How AI is used (and why it matters)
        </h2>
        <p className="text-gray-600 text-lg">
          UpSaarthi uses AI to understand questions, identify relevant domains,
          and recommend the right experts. AI supports trust, efficiency, and
          scale — while final guidance remains human-led.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Find your Saarthi. Grow with confidence.
        </h2>
        <p className="mb-6 text-lg">
          Ask questions, connect with experts, and make better decisions.
        </p>
        <Link
          to="/register"
          className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

/* Reusable Components */

function Feature({ title, description }) {
  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Audience({ title, text }) {
  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
