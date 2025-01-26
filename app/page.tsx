import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-dots">
      {/* Navigation */}
      <nav className="nav-bar flex justify-between items-center py-4 px-4 md:px-8 sticky top-0 z-50 border-b relative">
        <div className="swimming-whale">
          <svg viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Whale Body */}
            <path 
              d="M30 12.5C30 17.5 25.5 22.5 15 22.5C4.5 22.5 0 17.5 0 12.5C0 7.5 4.5 2.5 15 2.5C25.5 2.5 30 7.5 30 12.5Z" 
              fill="currentColor"
            />
            {/* Whale Tail */}
            <path 
              className="whale-tail"
              d="M28 12.5L40 5V20L28 12.5Z" 
              fill="currentColor"
            />
            {/* Whale Eye */}
            <circle cx="25" cy="10" r="1.5" fill="white" />
            {/* Water Spout */}
            <path 
              className="whale-spout"
              d="M22 2.5C22 2.5 23 0 24 0C25 0 26 2.5 26 2.5" 
              stroke="currentColor" 
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <Link href="/" className="flex items-center gap-2 nav-logo-shine">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-dark rounded-lg rotate-45 hover:rotate-0 transition-all duration-300 cursor-pointer group">
            <span className="flex items-center justify-center h-full -rotate-45 text-white font-bold group-hover:rotate-0 transition-all duration-300">P</span>
          </div>
          <span className="text-lg font-semibold hidden sm:block text-foreground">Portfolio</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-6 md:gap-8 nav-items-container">
            <a href="#projects" className="nav-link text-sm font-medium cursor-pointer">PROJECTS</a>
            <a href="#contact" className="nav-link text-sm font-medium cursor-pointer">CONTACT</a>
            <a 
              href="https://x.com/PranavGarg1234?t=E4Ox8nLRXyMh2-W-2LB9eg&s=08&mx=2"
              target="_blank"
              rel="noopener noreferrer" 
              className="nav-link text-sm font-medium"
            >
              BLOG
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://drive.google.com/file/d/1nCZsA6MmGPMk2SxlqYulQpst3kDH5ea9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer" 
              className="resume-button px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 group"
            >
              <span>RESUME</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <div className="theme-toggle">
              <ThemeToggle />
            </div>
          </div>
          <button className="sm:hidden p-2 hover:bg-project-hover rounded-lg transition-colors menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section text-center pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="relative z-10">
          <div className="relative w-32 h-32 mx-auto mb-8 animate-float">
            <div className="absolute inset-0 bg-accent rounded-full"></div>
            <Image
              src="/profile.jpeg"
              alt="Profile"
              width={128}
              height={128}
              className="relative z-10 rounded-full object-cover w-full h-full"
              priority
            />
          </div>
          <h1 className="text-2xl mb-2">Hi I'm Pranav Garg</h1>
          <h2 className="text-5xl md:text-6xl font-bold max-w-3xl mx-auto mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent hero-shine">
            Building digital products, brands, and experience.
          </h2>
          <p className="text-foreground/75 max-w-2xl mx-auto mb-8 leading-relaxed">
            A Full Stack Developer and Visual Designer with experience in web design, brand identity and product design.
          </p>
          <a 
            href="https://www.linkedin.com/in/pranav-garg-b11145288/"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-button group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium"
          >
            <span className="relative z-10">CONNECT WITH ME</span>
            <div className="connect-icon relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section py-16 px-4 md:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-accent via-accent-dark to-accent bg-clip-text text-transparent">Featured Projects</h2>
          <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">Explore my latest work - a collection of personal and professional projects showcasing my skills in web development and design.</p>
          
          <div className="project-grid">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div 
                key={index} 
                className="card-hover group relative rounded-xl overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-accent/5 to-accent-light/10 group-hover:scale-105 transition-transform duration-500 ease-out"></div>
                <div className="p-6">
                  <h3 className="project-title mb-2 group-hover:text-accent transition-colors">Project Title {index}</h3>
                  <p className="project-description text-sm mb-4">A brief description of the project and the technologies used in its development.</p>
                  <div className="flex gap-2 flex-wrap">
                    {['React', 'Next.js', 'Tailwind'].map((tech) => (
                      <span key={tech} className="tech-tag text-xs px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-overlay absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="btn-primary group inline-flex items-center gap-2">
              VIEW ALL PROJECTS
              <span className="inline-block transition-transform group-hover:translate-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {/* ... existing skills section ... */}

      {/* Testimonials Section */}
      {/* ... existing testimonials section ... */}

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-6 scroll-mt-20">
        {/* ... existing contact section content ... */}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-6 text-lg hover:text-accent transition-colors">pranavgarg0410@gmail.com</p>
          <div className="social-icons flex justify-center gap-6 mb-8">
            {[
              { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/pranav-garg-b11145288/' },
              { platform: 'GitHub', url: 'https://github.com/Pheonix-dev0410' },
              { platform: 'Instagram', url: 'https://www.instagram.com/pra.nav_garg/' }
            ].map(({ platform, url }) => (
              <a 
                key={platform} 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="hover:text-accent transform hover:scale-110 transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d={
                    platform === 'LinkedIn'
                      ? "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      : platform === 'GitHub'
                      ? "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      : "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.824-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
                  } clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
          <div className="text-sm text-gray-400/75 dark:text-gray-500/75">
            <p>Copyright © Pranav Garg 2025. All rights reserved</p>
            <p className="mt-2 hover:text-accent transition-colors">TEMPLATE BY Pranav Garg</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
