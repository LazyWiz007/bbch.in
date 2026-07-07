"use client";

export function FacebookFeed() {
  return (
    <div className="overflow-hidden rounded-xl border border-line" suppressHydrationWarning>
      {/* fb-root is required by the Facebook SDK and must be in a client component */}
      <div id="fb-root" suppressHydrationWarning />
      <div
        className="fb-page"
        data-href="https://www.facebook.com/BangaloreBicycleChampionships/"
        data-tabs="timeline"
        data-width="500"
        data-height="500"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
        suppressHydrationWarning
      />
    </div>
  );
}
