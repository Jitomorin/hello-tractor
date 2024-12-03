const callouts = [
  {
    name: "Tractor Attachments",
    description: "High-quality tools and accessories for your tractor.",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.I94PhXmm1q79TxZZ9FtyCQHaD-%26pid%3DApi&f=1&ipt=14d643002f3801582bd956915cfdf19ea760d64f9249791e2e5fcc5e4cddb6b3&ipo=images",
    imageAlt: "Various tractor attachments displayed, ready for use.",
    href: "#",
  },
  {
    name: "Maintenance Tools",
    description:
      "Journals, guides, and tools to keep your tractor in top condition.",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.5gCnsAm-Vq711-i9H73B7gHaE8%26pid%3DApi&f=1&ipt=a1666119fe3f6561a9751fad108f11e02f52d36b9817f8895333164b6afa0e5d&ipo=images",
    imageAlt:
      "Workstation with essential tools and manuals for tractor maintenance.",
    href: "#",
  },
  {
    name: "Tractor Accessories",
    description: "Upgrade your tractor with premium accessories.",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZLiDriieAfWRn2hQ-W7OWQHaE7%26pid%3DApi&f=1&ipt=41ab7f4367bf4235afb5a50a12e265ef49ad6eddabbc360c7ad9aad731df786b&ipo=images",
    imageAlt: "Selection of high-quality tractor accessories.",
    href: "#",
  },
];

export default function Category() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div
                key={callout.name}
                className="group relative hover:scale-[1.03] transition-all ease-in-out"
              >
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
