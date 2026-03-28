import { useEffect, useState } from "react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioTile from "@/components/PortfolioTile";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  video: string;
}

interface PortfolioData {
  artist: { name: string; tagline: string };
  navigation: { label: string; href: string }[];
  projects: Project[];
}

const Index = () => {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background">
      <PortfolioHeader name={data.artist.name} navigation={data.navigation} />
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid grid-cols-3 gap-1">
          {data.projects.map((project) => (
            <PortfolioTile
              key={project.id}
              title={project.title}
              thumbnail={project.thumbnail}
              video={project.video}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
