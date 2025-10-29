interface QuarterBadgeProps {
    quarter: 1 | 2 | 3 | 4
}

export default function QuarterBadge({ quarter } : QuarterBadgeProps) {
    const label = `Q${quarter}`;
    return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-amber-800 border border-amber-300"
        aria-label="Quarter"
        title="Game Quarter">
            {label}
        </span>
    );
}