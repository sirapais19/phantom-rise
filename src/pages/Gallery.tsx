import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Image as ImageIcon } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { galleryAlbums } from "@/data/teamData";

const Gallery = () => {
  const [activeAlbum, setActiveAlbum] = useState("Tournament");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const currentAlbum = galleryAlbums.find((a) => a.name === activeAlbum);

  // Placeholder images for demo
  const placeholderImages = [
    { id: 1, src: "", alt: "Action shot 1" },
    { id: 2, src: "", alt: "Action shot 2" },
    { id: 3, src: "", alt: "Action shot 3" },
    { id: 4, src: "", alt: "Team celebration" },
    { id: 5, src: "", alt: "Training session" },
    { id: 6, src: "", alt: "Tournament moment" },
  ];

  const videos = [
    { id: 1, platform: "YouTube", title: "Season Highlights 2024", embedUrl: "" },
    { id: 2, platform: "Instagram", title: "Training Montage", embedUrl: "" },
    { id: 3, platform: "TikTok", title: "Best Plays", embedUrl: "" },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground">
              Capturing moments of excellence, spirit, and team pride
            </p>
          </motion.div>
        </div>
      </section>

      {/* Album Tabs */}
      <section className="section-container">
        <div className="flex justify-center gap-2 flex-wrap">
          {galleryAlbums.map((album) => (
            <button
              key={album.name}
              onClick={() => setActiveAlbum(album.name)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeAlbum === album.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {album.name}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="page-section">
        <div className="section-container">
          <motion.div
            key={activeAlbum}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {placeholderImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image.alt)}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-foreground text-sm font-medium">{image.alt}</p>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full aspect-video bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">{selectedImage}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Videos Section */}
      <section className="page-section">
        <div className="section-container">
          <SectionHeading
            title="Videos"
            subtitle="Watch our highlights and behind-the-scenes content"
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <GlassCard key={video.id} delay={index * 0.1} className="group">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary">
                    {video.platform}
                  </span>
                  <h3 className="font-semibold text-foreground">{video.title}</h3>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Gallery;
