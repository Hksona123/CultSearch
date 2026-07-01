interface BadgeProps {
  verified?: boolean;
}

export function Badge({ verified }: BadgeProps) {
  if (!verified) return null;
  return <span className="text-blue-500 text-xs ml-1">✓</span>;
}
