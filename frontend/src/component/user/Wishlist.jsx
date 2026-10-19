
function Wishlist() {
  return (
    <div className="min-h-screen bg-[#F2FAFC] px-4 py-8 sm:px-6 lg:px-8">

      {/* Wishlist Heading */}
      <div className="mx-auto max-w-7xl">

        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e2f5ee] text-3xl text-[#008f62]">
              ♡
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#183b5b]">
                My Wishlist
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Your favorite medicines, always within reach.
              </p>
            </div>
          </div>

          <div className="flex max-w-sm items-center gap-3 rounded-xl bg-[#e7f6f0] px-5 py-3 text-sm text-[#34556a]">
            <span className="text-2xl text-[#008f62]">♡</span>
            <p>
              Save your favorite products and buy them later, whenever you need.
            </p>
          </div>

        </div>

        {/* Medicine Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {/* Card 1 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=contain"
                alt="Paracetamol"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Paracetamol 650mg</h2>
            <p className="mt-1 text-xs text-slate-500">Pain Relief</p>
            <p className="mt-3 font-bold text-[#008f62]">₹120</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=200&fit=contain"
                alt="Vitamin C"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Vitamin C 500mg</h2>
            <p className="mt-1 text-xs text-slate-500">Immunity Booster</p>
            <p className="mt-3 font-bold text-[#008f62]">₹150</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=contain"
                alt="Cough Syrup"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Cough Syrup</h2>
            <p className="mt-1 text-xs text-slate-500">Cough &amp; Cold</p>
            <p className="mt-3 font-bold text-[#008f62]">₹95</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=200&fit=contain"
                alt="Antacid Tablets"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Antacid Tablets</h2>
            <p className="mt-1 text-xs text-slate-500">Acidity Relief</p>
            <p className="mt-3 font-bold text-[#008f62]">₹80</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=200&fit=contain"
                alt="Antiseptic Cream"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Dettol Antiseptic Cream</h2>
            <p className="mt-1 text-xs text-slate-500">First Aid</p>
            <p className="mt-3 font-bold text-[#008f62]">₹60</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=300&h=200&fit=contain"
                alt="Digital Thermometer"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Digital Thermometer</h2>
            <p className="mt-1 text-xs text-slate-500">Fever Check</p>
            <p className="mt-3 font-bold text-[#008f62]">₹180</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

          {/* Card 7 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&h=200&fit=contain"
                alt="Band Aid Plasters"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Band Aid Plasters</h2>
            <p className="mt-1 text-xs text-slate-500">Wound Care</p>
            <p className="mt-3 font-bold text-[#008f62]">₹70</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

          {/* Card 8 */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="relative flex h-28 items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=200&fit=contain"
                alt="Multivitamin Tablets"
                className="h-full w-full object-contain"
              />
              <span className="absolute right-0 top-0 text-xl text-red-500">♥</span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-[#183b5b]">Multivitamin Tablets</h2>
            <p className="mt-1 text-xs text-slate-500">Overall Health</p>
            <p className="mt-3 font-bold text-[#008f62]">₹220</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008f62] px-2 py-2.5 text-xs font-semibold text-white hover:bg-[#007650]">
                🛒 Add to Cart
              </button>
              <button className="px-1 text-lg text-[#34556a]" aria-label="Remove item">♜</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Wishlist;