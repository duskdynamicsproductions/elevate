type SocialIconProps = {
  id: string;
  size?: number;
};

const iconData: Record<string, { label: string; color: string }> = {
  Instagram: { label: '◎', color: 'linear-gradient(135deg, #833ab4, #fd1d1d 52%, #fcb045)' },
  TikTok: { label: '♪', color: '#111111' },
  YouTube: { label: '▶', color: '#ff0000' },
  'X (Twitter)': { label: 'X', color: '#111111' },
  Facebook: { label: 'f', color: '#1877f2' },
  Snapchat: { label: '●', color: '#f8d928' },
  Reddit: { label: '●', color: '#ff4500' },
  Pinterest: { label: 'P', color: '#e60023' },
  LinkedIn: { label: 'in', color: '#0a66c2' },
  WhatsApp: { label: '◔', color: '#25d366' },
};

export function SocialIcon({ id, size = 76 }: SocialIconProps) {
  const platform = id.match(/Platform=(.*?), Color=/)?.[1] ?? 'Instagram';
  const { label, color } = iconData[platform] ?? iconData.Instagram;
  const isLight = platform === 'Snapchat';

  return (
    <div
      aria-label={platform}
      className="flex items-center justify-center rounded-[23%] border border-white/20 font-black shadow-lg"
      style={{
        width: size,
        height: size,
        color: isLight ? '#121212' : '#fff',
        background: color,
        fontSize: platform === 'LinkedIn' ? size * 0.38 : size * 0.54,
        lineHeight: 1,
        textShadow: isLight ? 'none' : '0 1px 3px rgba(0,0,0,.24)',
      }}
    >
      {label}
    </div>
  );
}
