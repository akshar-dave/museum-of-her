export const metadata = {
  title: "Resources | The Museum of Her",
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-5 py-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Emergency */}
          <div className="bg-white/95 rounded-3xl p-5">
            <h2 className="text-xl mb-3 text-pink-600">Emergency</h2>
            <a 
              className="inline-block px-4 py-3 rounded-full bg-pink-300 text-white font-bold mb-2" 
              href="tel:112"
            >
              <svg className="inline-block w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-mono font-extrabold">112</span> — Police • Ambulance • Fire
            </a>
            <div className="flex flex-wrap gap-2.5 mt-2">
              <button className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm">
                Copy 112
              </button>
              <a 
                className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" 
                href="https://112.gov.in/" 
                target="_blank"
              >
                About 112
              </a>
            </div>
            <details className="bg-white rounded-xl p-2.5 mt-2.5">
              <summary className="cursor-pointer font-bold text-pink-600">More emergency contacts</summary>
              <div className="flex justify-between gap-3 py-3 border-b border-dashed border-black/10">
                <div>
                  <strong>Women Helpline</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">24×7</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="tel:181">Call 181</a>
                  <button className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm">Copy</button>
                </div>
              </div>
              <div className="flex justify-between gap-3 py-3 border-b border-dashed border-black/10">
                <div>
                  <strong>NCW Helpline</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Escalations</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="tel:7827170170">Call</a>
                  <button className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm">Copy</button>
                </div>
              </div>
              <div className="flex justify-between gap-3 py-3">
                <div>
                  <strong>Childline</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">For children</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="tel:1098">Call 1098</a>
                  <button className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm">Copy</button>
                </div>
              </div>
            </details>
          </div>

          {/* Counsellors */}
          <div className="bg-white/95 rounded-3xl p-5">
            <h2 className="text-xl mb-3 text-pink-600">Counsellors</h2>
            <a 
              className="inline-block px-4 py-3 rounded-full bg-pink-300 text-white font-bold mb-2" 
              href="tel:14416"
            >
              <svg className="inline-block w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-mono font-extrabold">14416</span> — Tele-MANAS (24×7)
            </a>
            <div className="flex flex-wrap gap-2.5 mt-2">
              <button className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm">
                Copy 14416
              </button>
              <a 
                className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" 
                href="https://telemanas.mohfw.gov.in/" 
                target="_blank"
              >
                Learn more
              </a>
            </div>
            <details className="bg-white rounded-xl p-2.5 mt-2.5">
              <summary className="cursor-pointer font-bold text-pink-600">More counselling lines</summary>
              <div className="flex justify-between gap-3 py-3 border-b border-dashed border-black/10">
                <div>
                  <strong>iCALL (TISS)</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Counselling</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="tel:9152987821">Call</a>
                  <button className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm">Copy</button>
                </div>
              </div>
              <div className="flex justify-between gap-3 py-3">
                <div>
                  <strong>Snehi Helpline</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Delhi-based</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="tel:9582208181">Call</a>
                  <button className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm">Copy</button>
                </div>
              </div>
            </details>
          </div>

          {/* Psychiatrists */}
          <div className="bg-white/95 rounded-3xl p-5">
            <h2 className="text-xl mb-3 text-pink-600">Psychiatrists</h2>
            <p className="text-gray-600 mb-3">Access professional psychiatric care and medication support.</p>
            <details className="bg-white rounded-xl p-2.5 mt-2.5">
              <summary className="cursor-pointer font-bold text-pink-600">Government services</summary>
              <div className="flex justify-between gap-3 py-3 border-b border-dashed border-black/10">
                <div>
                  <strong>AIIMS Psychiatry Dept</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Delhi</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="https://aiims.edu">Visit site</a>
                </div>
              </div>
              <div className="flex justify-between gap-3 py-3">
                <div>
                  <strong>NIMHANS</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Bengaluru</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="https://nimhans.ac.in">Visit site</a>
                </div>
              </div>
            </details>
            <details className="bg-white rounded-xl p-2.5 mt-2.5">
              <summary className="cursor-pointer font-bold text-pink-600">Private networks</summary>
              <div className="flex justify-between gap-3 py-3">
                <div>
                  <strong>Practo</strong><br/>
                  <span className="text-xs border border-black/15 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Online booking</span>
                </div>
                <div className="flex flex-col gap-2 min-w-36">
                  <a className="border border-gray-800 bg-white text-gray-800 px-3 py-2 rounded-lg cursor-pointer font-semibold text-sm no-underline" href="https://www.practo.com/psychiatrist">Find psychiatrist</a>
                </div>
              </div>
            </details>
          </div>

          {/* Cybercrime */}
          <div className="bg-white/95 rounded-3xl p-5">
            <h2 className="text-xl mb-3 text-pink-600">Cybercrime</h2>
            <a 
              className="inline-block px-4 py-3 rounded-full bg-pink-300 text-white font-bold mb-2" 
              href="https://cybercrime.gov.in/" 
              target="_blank"
            >
              Report Online
            </a>
            <p className="text-gray-600">File a complaint on India's official cybercrime portal.</p>
          </div>
        </div>

        <footer className="mt-12 text-gray-500 text-sm text-center">
          Made with care.
        </footer>
      </main>
    </div>
  );
}
