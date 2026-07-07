"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "race-06",
    label: "Race #06 (Classic Road Race)",
    title: "BBCh26 Race #06 | CLASSIC ROAD RACE | 19th July 2026",
    iframeUrl: "https://konfhub.com/attendees/edec2ac0-66e9-4e91-8749-63104a8d8f93",
    height: 650,
  },
  {
    id: "season-ticket",
    label: "Season Ticket Buyers",
    title: "BBCh 2026 - Season Ticket Buyer List",
    iframeUrl: "https://in.explara.com/em/event/attendee/attendee-list-widget/eid/640771",
    height: 480,
  },
];

export function AttendeeListTabs() {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  return (
    <div className="flex flex-col gap-6">
      {/* Segmented Control Selector */}
      <div className="flex justify-center sm:justify-start">
        <div className="inline-flex rounded-lg bg-paper p-1 border border-line">
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-semibold font-display transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-cream text-ink shadow-sm border border-line"
                    : "text-greige hover:text-ink border border-transparent"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame Container */}
      <div className="rounded-xl border border-line bg-cream p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          if (!isActive) return null;

          return (
            <div key={tab.id} className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4">
                <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
                  {tab.title}
                </h2>
                <span className="inline-flex items-center rounded-md bg-paper border border-line px-2.5 py-0.5 text-xs font-semibold text-greige font-mono">
                  Iframe Embed
                </span>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-paper/50">
                <iframe
                  title={tab.title}
                  src={tab.iframeUrl}
                  width="100%"
                  height={tab.height}
                  className="w-full border-0"
                  style={{ border: "none" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
