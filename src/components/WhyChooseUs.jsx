import React from 'react';

const features = [
  {
    title: 'All in One Place',
    desc: 'check trip cost? organise trip plans? set budget? we got you.',
  },
  {
    title: 'Budget Plan That\'s Best For You',
    desc: 'Generate a budget plan suitable for your budget',
  },
    {
    title: 'Personalized Trip Plan',
    desc: 'Make the best budget plan for your trip',
  },
  {
    title: 'Keep Track',
    desc: 'Save and track your trip plan',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto mt-24 px-6">
      <h2 className="text-3xl font-semibold text-[#4B3A2D] text-center mb-12">Why Checkpoint?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-8 text-center 
                       hover:shadow-xl hover:-translate-y-1 
                       transition-all duration-300"
          >
            <div className="text-4xl text-[#4B3A2D] mb-3">{f.icon}</div>

            <h3 className="text-xl font-semibold text-[#4B3A2D]">{f.title}</h3>

            <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
