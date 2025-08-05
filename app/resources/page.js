export const metadata = {
  title: "Resources | The Museum of Her",
};

const sections = [
  {
    title: "Emergency & Helplines",
    items: [
      { name: "Women Helpline", contact: "1091" },
      {
        name: "National Commission for Women",
        contact: "181",
        // link: "http://ncw.nic.in",
      },
      {
        name: "Child Helpline",
        contact: "1098",
        // link: "https://childlineindia.org.in",
      },
      {
        name: "Cyber Crime Helpline",
        contact: "1930",
        // link: "https://cybercrime.gov.in",
      },
      {
        name: "Anti-Stalking/Harassment Helpline (Delhi)",
        contact: "1096",
      },
    ],
  },
  // {
  //   title: "Mental Health Support",
  //   items: [
  //     {
  //       name: "iCall (TISS)",
  //       contact: "9152987821",
  //       link: "https://icallhelpline.org",
  //     },
  //     {
  //       name: "Vandrevala Foundation Helpline",
  //       contact: "1860 266 2345",
  //       link: "http://www.vandrevalafoundation.com",
  //     },
  //     { name: "AASRA", contact: "9820466726", link: "http://www.aasra.info" },
  //   ],
  // },
  // {
  //   title: "Legal Aid",
  //   items: [
  //     {
  //       name: "Legal Services India",
  //       link: "https://www.legalserviceindia.com",
  //     },
  //     { name: "Nyaaya", link: "https://www.nyaaya.org" },
  //     {
  //       name: "Breakthrough India – Legal Support",
  //       link: "https://inbreakthrough.org",
  //     },
  //   ],
  // },
];

export default function Resources() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif mb-8 text-center">Resources</h1>
      {sections.map((section) => (
        <ul
          key={section.title}
          className="flex flex-col bg-white rounded-2xl overflow-hidden py-1 divide-y divide-blue-200"
        >
          {section.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white flex items-center pl-4 justify-between"
            >
              <div className="flex flex-col">
                <p className="">{item.name}</p>
                <p className="text-xl text-[#0088ff]">{item.contact}</p>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black-600 hover:underline mt-1 inline-block"
                  >
                    {item.link}
                  </a>
                ) : null}
              </div>

              {item.contact ? (
                <a href={`tel:${item.contact}`} className="h-full p-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#0088ff"
                  >
                    <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z" />
                  </svg>
                </a>
              ) : null}
            </div>
          ))}
        </ul>
      ))}
    </div>
  );
}
