interface NavItem {
  label: string;
  href: string;
}

interface PortfolioHeaderProps {
  name: string;
  navigation: NavItem[];
  compact?: boolean;
}

const PortfolioHeader = ({ name, navigation, compact }: PortfolioHeaderProps) => {
  return (
    <header className={`flex flex-col items-center ${compact ? 'gap-0 py-6 pb-4' : 'gap-4 py-12 pb-8'}`}>
      <h1 className={`font-display tracking-tight text-foreground ${compact ? 'text-xl' : 'text-3xl'}`}>{name}</h1>
      <nav className="flex gap-8">
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default PortfolioHeader;
