import * as Icons from "lucide-react";
import { Plus } from "lucide-react";
import { tools, stats } from "@/data/tools";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";
import CountUp from "../ui/CountUp";

export default function ToolsStats() {
  return (
    <section id="skills" className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <Plus className="pointer-events-none absolute left-8 top-8 text-white/15" size={16} />

      <div className="section-container">
        <Reveal>
          <SectionLabel>My Skills</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Tools I Use
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span
              key={tool.name}
              title={tool.name}
              style={{ backgroundColor: tool.color }}
              className="grid h-12 w-12 place-items-center rounded-xl text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-1 hover:rotate-3"
            >
              {tool.label}
            </span>
          ))}
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = Icons[stat.icon] ?? Icons.Star;
            return (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center">
                <Icon className="mx-auto mb-2 text-brand-pink" size={22} />
                <p className="font-heading text-3xl font-extrabold text-white">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  {stat.label}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
