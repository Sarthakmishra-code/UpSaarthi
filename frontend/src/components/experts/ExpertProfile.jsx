export default function ExpertProfile() {
  const expert = {
    name: "Rahul Sharma",
    domain: "Web Development",
    linkedin: "https://linkedin.com/in/rahul",
    github: "https://github.com/rahul",
    portfolio: "https://rahul.dev",
    cvUrl: "/sample-cv.pdf",
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 border rounded">
      <h1 className="text-2xl font-bold">{expert.name}</h1>
      <p className="text-gray-600">{expert.domain}</p>

      <div className="mt-4 space-y-2">
        <a href={expert.linkedin} className="text-indigo-600" target="_blank">
          LinkedIn
        </a>
        <br />
        <a href={expert.github} className="text-indigo-600" target="_blank">
          GitHub
        </a>
        <br />
        <a href={expert.portfolio} className="text-indigo-600" target="_blank">
          Portfolio
        </a>
        <br />
        <a href={expert.cvUrl} className="text-indigo-600" target="_blank">
          Download CV
        </a>
      </div>
    </div>
  );
}
