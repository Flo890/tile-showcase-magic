import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import { ArrowLeft } from "lucide-react";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  video: string;
  embed?: string;
  description?: string;
  gallery?: string[];
}

interface PortfolioData {
  artist: { name: string; tagline: string };
  navigation: { label: string; href: string }[];
  projects: Project[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load portfolio data");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const project = data.projects.find((p) => p.id === id);
  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <PortfolioHeader name={data.artist.name} navigation={data.navigation} compact />
        <main className="mx-auto max-w-5xl px-4 pb-16 text-center">
          <h2 className="mb-4 font-display text-2xl text-foreground">Project not found</h2>
          <Link to="/" className="text-sm text-muted-foreground underline hover:text-foreground">
            Back to work
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PortfolioHeader name={data.artist.name} navigation={data.navigation} compact />
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to work
        </Link>

        {/* Hero media — full width video or image (embed shown below title) */}
        <div className="mb-8 overflow-hidden rounded-sm">
          {project.video ? (
            <video
              src={project.video}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full"
            />
          ) : (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full"
            />
          )}
        </div>

        {/* Title */}
        <div className="mb-6 max-w-2xl">
          <h2 className="font-display text-2xl text-foreground">
            {project.title}
          </h2>
        </div>

        {/* Embed between title and description */}
        {project.embed && (
          <div
            className="mb-8 w-full [&>iframe]:w-full [&>iframe]:aspect-video"
            dangerouslySetInnerHTML={{ __html: project.embed }}
          />
        )}

        {/* Description */}
        {project.description && (
          <div className="mb-12 max-w-2xl">
            <p className="leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        )}

        {/* Gallery grid */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-1">
            {project.gallery.map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`${project.title} detail ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetail;
