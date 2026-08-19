
interface MathBadgeProps {
  children: string;
}

export default function MathBadge({ children }: MathBadgeProps) {
  return (
    <code className="mx-1 font-mono font-extrabold text-[13px] bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded shadow-sm hover:scale-105 transition-all duration-200 cursor-default">
      {children}
    </code>
  );
}
