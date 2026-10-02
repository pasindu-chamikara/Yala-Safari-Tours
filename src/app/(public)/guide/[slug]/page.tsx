import Link from 'next/link';

export default function GuidePage({ params }: { params: { slug: string } }) {
  const titles: Record<string, string> = {
    'best-time-to-visit': 'Best Time to Visit Yala',
    'safari-tips': 'Essential Safari Tips',
    'wildlife': 'Yala Wildlife Guide'
  };
  
  const title = titles[params.slug] || 'Safari Guide';

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/" className="text-stone-500 hover:text-[#314a1c] flex items-center gap-2 font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
        </div>
        <div className="bg-white rounded-none shadow-xl p-8 border border-stone-100">
          <h1 className="text-4xl font-bold text-stone-800 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>{title}</h1>
          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-stone-600 mb-6">
              Welcome to the {title}. This section is currently being updated with comprehensive information to help you plan your perfect safari experience.
            </p>
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-none">
              <h3 className="text-xl font-bold text-stone-800 mb-3">Coming Soon</h3>
              <p className="text-stone-600">
                Our expert guides are putting together detailed articles, photos, and tips. Check back soon for full details!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
