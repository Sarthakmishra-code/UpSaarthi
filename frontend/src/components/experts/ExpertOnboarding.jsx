import { useState } from "react";

export default function ExpertOnboarding() {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    linkedin: "",
    github: "",
    portfolio: "",
    cv: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Later: send to backend using FormData
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Expert Profile Setup</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="domain"
          placeholder="Primary Domain (e.g. Web, Finance)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="url"
          name="github"
          placeholder="GitHub Profile URL"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio / Website"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="file"
          accept=".pdf"
          className="w-full"
          onChange={handleFileChange}
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
          Submit for Verification
        </button>
      </form>
    </div>
  );
}
